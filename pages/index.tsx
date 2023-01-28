/* eslint-disable prettier/prettier */
import Head from "next/head"
import { Key } from "swr"
import Link from "next/link"
import { Hero, FeaturedPosts } from "../components"
import { useSWRWithTimeout } from "../components/hooks/swr"

type HomeDataResponse = {
  data: {
    page: {
      content: string
      title: string
    }
  }
}

type PostDataResponse = {
  data: {
    posts: {
      edges: {
        node: {
          excerpt: string
          slug: string
          title: string
        }
      }[]
    }
  }
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
    <div className="relative">
      <Head>
        <title>travel-like-a-local-jp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <FeaturedPosts />

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
