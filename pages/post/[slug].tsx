/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse, AxiosError } from "axios"
import { SWRConfig } from "swr"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import request, { gql } from "graphql-request"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""
import { unstable_serialize } from "swr"
import PostWidget from "components/organisms/PostWidget"
import { GraphqlGetCategoryResponse } from "components/types/apiResponse"

type Params = {
  slug: string
} & ParsedUrlQuery

const Post: React.FC<GetStaticPropsResponse> = ({ slug, fallback }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href={`http://headlessnext.local/wp-includes/css/dist/block-library/style.min.css?ver=5.6`}
        />
      </Head>

      <SWRConfig value={{ fallback }}>
        <PostWidget slug={slug} />
      </SWRConfig>
    </div>
  )
}

export default Post

type GetStaticPropsResponse = {
  slug: string
  fallback: {
    [key: string]: {
      categories: string[]
      slug: string
    }
  }
}

// GetStaticPropsの型付け(https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  Params
> = async ({ params }) => {
  const slug = params?.slug ?? ""

  const queryGetPostWidgetProps = gql`
    query GetPostWidgetProps($id: ID!) {
      post(id: $id, idType: SLUG) {
        categories {
          edges {
            node {
              name
            }
          }
        }
        slug
      }
    }
  `

  const getPostWidgetPropsResponse: GraphqlGetCategoryResponse = await request(
    GRAPHQL_API_URL,
    queryGetPostWidgetProps,
    { id: slug } // 引数渡すときは`request`の第3引数にオブジェクトオブジェクト指定する
  )

  const categories = getPostWidgetPropsResponse.post.categories.edges.map(
    ({ node }) => node.name
  )

  return {
    props: {
      slug: slug,
      fallback: {
        // {fallback}のkeyとして動的APIエンドポイントを指定したい場合は unstable_serializeを使う
        [unstable_serialize(["/api/post", slug])]: {
          categories,
          slug
        }
      }
    }
  }
}

type GetStaticPathsResponse = {
  data: {
    posts: {
      edges: {
        node: {
          slug: string
        }
      }[]
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const options = {
    method: "POST",
    url: GRAPHQL_API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query allPosts {
          posts {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
    }
  }
  const allPosts: GetStaticPathsResponse = await axios
    .request(options)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      if (err.code === "ECONNABORTED") {
        console.log("axios API call failed")
      }
    })

  const {
    data: {
      posts: { edges }
    }
  } = allPosts

  const paths = edges.map(({ node }) => {
    return {
      params: {
        slug: node.slug
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
