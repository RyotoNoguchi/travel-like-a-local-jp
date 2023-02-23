/* eslint-disable prettier/prettier */
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import request, { gql } from "graphql-request"
import { SWRConfig, unstable_serialize } from "swr"
import {
  GraphqlGetAllSlugsResponse,
  GraphqlGetPostsExcludeBySlugResponse
} from "components/types/apiResponse"
import { Post } from "components/types/post"
import { PostWidget } from "components/index"
import { useRouter } from "next/router"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Post: React.FC<Props> = ({ fallback }) => {
  console.log(fallback)
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)

  return (
    <>
      <Head>
        <title>single post page</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href={`http://headlessnext.local/wp-includes/css/dist/block-library/style.min.css?ver=5.6`}
        />
      </Head>
      <SWRConfig value={{ fallback }}>
        <PostWidget slug={slug} />
      </SWRConfig>
    </>
  )
}

export default Post

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[]
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  GetStaticPropsParams
> = async ({ params }) => {
  const slug = params?.slug ?? "default"

  const queryGetCategoryBySlug = gql`
    query GetCategoryBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `

  type GraphQLGetCategoryBySlugResponse = {
    post: {
      categories: {
        edges: {
          node: {
            name: string
          }
        }[]
      }
    }
  }

  const queryGetCategoryBySlugResponse: GraphQLGetCategoryBySlugResponse =
    await request(GRAPHQL_API_URL, queryGetCategoryBySlug, { slug })

  const category = queryGetCategoryBySlugResponse?.post?.categories?.edges.map(
    ({ node }) => node.name
  )[0]

  const queryGetRelatedPosts = gql`
    query GetPostsExcludeBySlug($slug: ID!, $categoryName: String!) {
      posts(where: { excludeBySlug: $slug, categoryName: $categoryName }) {
        edges {
          node {
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            date
            excerpt
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            slug
            title
          }
        }
      }
    }
  `

  const queryGetRelatedPostsResponse: GraphqlGetPostsExcludeBySlugResponse =
    await request(GRAPHQL_API_URL, queryGetRelatedPosts, {
      slug,
      categoryName: category
    })

  const posts = queryGetRelatedPostsResponse?.posts?.edges.map(
    ({ node }) => node
  )

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/post", slug])]: posts
      }
    }
  }
}

// getStaticPathsで返却してgetStaticPropsで引数として使用する値の型
type GetStaticPropsParams = {
  slug: string
}
export const getStaticPaths: GetStaticPaths<
  GetStaticPropsParams
> = async () => {
  const queryGetAllSlugs = gql`
    query getAllSlugs {
      posts {
        edges {
          node {
            slug
          }
        }
      }
    }
  `

  const queryGetAllSlugsResponse: GraphqlGetAllSlugsResponse = await request(
    GRAPHQL_API_URL,
    queryGetAllSlugs
  )

  const paths = queryGetAllSlugsResponse?.posts?.edges?.map(({ node }) => {
    return {
      params: {
        slug: node.slug
      }
    }
  })

  return {
    paths,
    fallback: "blocking"
  }
}
