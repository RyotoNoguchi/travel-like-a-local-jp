import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"
import request, { gql } from "graphql-request"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""
// import { unstable_serialize } from "swr"
// import PostWidget from "components/organisms/PostWidget"
import { GraphqlGetPostResponse } from "components/types/apiResponse"
import { GraphqlGetAllSlugsResponse } from "components/types/apiResponse"
import { Post } from "components/types/post"
import { PostWidget } from "components/index"

type Props = {
  post: Post
}
const Post: React.FC<Props> = ({ post }) => {
  console.log("post", post)
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
      <PostWidget />
    </>
  )
}

export default Post

export const getStaticProps: GetStaticProps<
  { post: Post },
  PostPageProps
> = async ({ params }) => {
  const slug = params?.slug ?? ""

  const queryGetPost = gql`
    query GetPostProps($id: ID!) {
      post(id: $id, idType: SLUG) {
        slug
        title
        excerpt
        date
        categories {
          edges {
            node {
              name
            }
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  `

  const queryGetPostResponse: GraphqlGetPostResponse = await request(
    GRAPHQL_API_URL,
    queryGetPost,
    { id: slug }
  )

  const post = queryGetPostResponse?.post

  return {
    props: {
      post
    }
  }
}

// getStaticPathsで返却してgetStaticPropsで引数として使用する値の型
type PostPageProps = {
  slug: string
}
export const getStaticPaths: GetStaticPaths<PostPageProps> = async () => {
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
    fallback: false
  }
}
