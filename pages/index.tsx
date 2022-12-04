/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse, AxiosError } from "axios"
import useSWR, { Key, Fetcher, SWRResponse } from "swr"
import Link from "next/link"

type HomeDataResponse = {
  data: HomeData
}

type HomeData = {
  page: Page
}

type Page = {
  content: string
  title: string
}

type Config = {
  timeout: number
}

type PostDataResponse = {
  data: Post
}

type Post = {
  posts: Posts
}

type Posts = {
  edges: PostNode[]
}

type PostNode = {
  node: { excerpt: string; slug: string; title: string }
}

function useSWRWithTimeout<T>(key: Key): SWRResponse<T> {
  const fetcher: Fetcher<T, string> = (apiPath) =>
    axios
      .get<T, AxiosResponse<T, AxiosError>, Config>(apiPath, { timeout: 10000 })
      .then((res) => res.data)
  return useSWR<T, Error>(key, fetcher, { shouldRetryOnError: false })
}

const Home: React.FC = () => {
  const homePageKey: Key = "api/page/sample-page"
  const recentPageKey: Key = "api/post/recent"

  const { data: homeData, error: homePageError } =
    useSWRWithTimeout<HomeDataResponse>(homePageKey)

  const { data: postData, error: postError } =
    useSWRWithTimeout<PostDataResponse>(recentPageKey)

  if (homePageError) {
    return <div>error...</div>
  }

  if (!homeData) {
    return <div>loading...</div>
  }

  const title = homeData.data.page.title
  const content = homeData.data.page.content

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        {postData?.data.posts.edges.map(({ node }) => {
          return (
            <div key={node.slug}>
              <h3>{node.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }}></div>
              <Link href={`post/${node.slug}`}>Read More</Link>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default Home
