/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse, AxiosError } from "axios"
import useSWR, { Key, Fetcher, SWRConfig } from "swr"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import request, { gql } from "graphql-request"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""
import { unstable_serialize } from "swr"
import PostWidget from "../../components/organisms/PostWidget"

type GetPostResponse = {
  data: {
    post: {
      content: string
      title: string
    }
  }
}

type Config = {
  timeout: number
}

type Params = {
  slug: string
} & ParsedUrlQuery

type GetStaticPathsResponse = {
  data: {
    posts: {
      edges: {
        node: {
          slug: string
          id: string
        }
      }[]
    }
  }
}

const Post: React.FC<GetStaticPropsResponse> = ({ slug, fallback }) => {
  const apiURL: Key = `/api/post/featured`
  const fetcher: Fetcher<GetPostResponse, string> = (path) =>
    axios
      .get<GetPostResponse, AxiosResponse<GetPostResponse, AxiosError>, Config>(
        path,
        {
          timeout: 10000
        }
      )
      .then((res) => res.data)
  const { data, error, isValidating } = useSWR(apiURL, fetcher)
  if (!data || isValidating) return <div>loading...</div>
  if (error) return <div>error...</div>

  // TODO {slug}をパラメータにしてgetPostById的な感じで`slug`と`categories`をfetch
  // TODO <PostWidget slug={slug} categories={categories}/>をreturnする
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

      {/* <main>
        <h1>{data.data.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.data.post.content }} />
      </main> */}
    </div>
  )
}

export default Post

type GetPostWidgetPropsResponse = {
  post: {
    categories: {
      edges: {
        node: {
          name: string
        }
      }[]
    }
    slug: string
  }
}

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
    query GetPostPostWidgetProps($id: ID!) {
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
  const getPostWidgetPropsResponse: GetPostWidgetPropsResponse = await request(
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
        [unstable_serialize(["/api/post", slug])]: {
          categories,
          slug
        }
      }
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
