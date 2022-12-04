/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse, AxiosError } from "axios"
import useSWR, { Key, Fetcher } from "swr"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

type APIResponse = {
  data: Data
}

type Data = {
  page: Page
}

type Page = {
  content: string
  title: string
}

type Config = {
  timeout: number
}

type Params = {
  slug: string[]
} & ParsedUrlQuery

type Props = {
  uri: string
}

type GetStaticPathsResponse = {
  data: Pages
}

type Pages = {
  pages: Edges
}

type Edges = {
  edges: Node[]
}

type Node = {
  node: { uri: string }
}

const Page: React.FC<{ uri: string }> = ({ uri }) => {
  const apiURL: Key = `/api/post/${uri}`
  const fetcher: Fetcher<APIResponse, string> = (path) =>
    axios
      .get<APIResponse, AxiosResponse<APIResponse, AxiosError>, Config>(path, {
        timeout: 10000
      })
      .then((res) => res.data)
  const { data, error, isValidating } = useSWR<APIResponse>(apiURL, fetcher)
  if (!data || isValidating) return <div>loading...</div>
  if (error) return <div>error...</div>

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

      <main>
        <h1>{data.data.page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.data.page.content }} />
      </main>
    </div>
  )
}

export default Page

// GetStaticPropsの型付け(https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  const slug = params?.slug
  const uri = slug?.join("/") ?? ""
  return {
    props: {
      uri
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query allPages {
          pages {
            edges {
              node {
                uri
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
      pages: { edges }
    }
  } = allPosts

  const paths = edges.map(({ node }) => {
    return {
      params: {
        slug: node.uri.split("/").filter((i) => i)
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
