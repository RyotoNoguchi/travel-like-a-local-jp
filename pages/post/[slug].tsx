/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse, AxiosError } from "axios"
import useSWR, { Key, Fetcher } from "swr"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

type GetPostResponse = {
  data: Data
}

type Data = {
  post: Post
}

type Post = {
  content: string
  title: string
}

type Config = {
  timeout: number
}

type Params = {
  slug: string
} & ParsedUrlQuery

type Props = {
  slug: string
}

type GetStaticPathsResponse = {
  data: Posts
}

type Posts = {
  posts: Edges
}

type Edges = {
  edges: Node[]
}

type Node = {
  node: { slug: string }
}

const Post: React.FC<{ slug: string }> = ({ slug }) => {
  const apiURL: Key = `/api/post/${slug}`
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
        <h1>{data.data.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.data.post.content }} />
      </main>
    </div>
  )
}

export default Post

// GetStaticPropsの型付け(https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  const slug = params?.slug ?? ""
  return {
    props: {
      slug
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
  console.log("allPosts:", allPosts.data)

  const {
    data: {
      posts: { edges }
    }
  } = allPosts

  console.log("edges:", edges)

  const paths = edges.map(({ node }) => {
    return { params: { slug: node.slug } }
  })

  return {
    paths,
    fallback: true
  }
}
