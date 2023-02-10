/* eslint-disable prettier/prettier */
import Head from "next/head"
import { Key, SWRConfig } from "swr"
import { Hero, FeaturedPosts } from "../components"
import { useSWRWithTimeout } from "../components/hooks/swr"
import {
  GetRecentPostsResponse,
  GetFeaturedPostsResponse,
  GetPopularPostsResponse
} from "../components/types/apiResponse"
import { Post } from "../components/types/post"
import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next"
import request, { gql } from "graphql-request"
import PostCards from "../components/organisms/PostCards"
import PopularPostCards from "../components/organisms/PopularPostCards"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

type HomeDataResponse = {
  data: {
    page: {
      content: string
      title: string
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ fallback }) => {
  console.log("fallback:", fallback)
  const homePageKey: Key = "api/page/sample-page"

  const { data: homeData, error: homePageError } =
    useSWRWithTimeout<HomeDataResponse>(homePageKey)

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
        <SWRConfig value={{ fallback }}>
          <FeaturedPosts />
        </SWRConfig>

        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <SWRConfig value={{ fallback }}>
          <PopularPostCards />
        </SWRConfig>

        {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
        {/* <SWRConfig value={{ fallback }}>
          <PostCards />
        </SWRConfig> */}
      </main>
    </div>
  )
}

export default Home

type GetStaticPropsResponse = {
  fallback: {
    "api/post/featured": Post[]
    "api/post/recent": Post[]
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse
> = async () => {
  const queryGetFeaturedPosts = gql`
    query GetFeaturedPosts {
      posts(where: { tag: "featured" }) {
        edges {
          node {
            slug
            title
            excerpt
            date
            content
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
      }
    }
  `
  const getFeaturedPostsResponse: GetFeaturedPostsResponse = await request(
    GRAPHQL_API_URL,
    queryGetFeaturedPosts
  )
  const featuredPosts: Post[] = getFeaturedPostsResponse.posts.edges.map(
    ({ node }) => node
  )

  const queryGetRecentPosts = gql`
    query GetRecentPosts {
      posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
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
      }
    }
  `
  const queryGetRecentPostsResponse: GetRecentPostsResponse = await request(
    GRAPHQL_API_URL,
    queryGetRecentPosts
  )
  const recentPosts: Post[] = queryGetRecentPostsResponse.posts.edges.map(
    ({ node }) => node
  )

  // TODO viewCountををqueryしてGetPopularPostsで人気記事を取得するように変更
  const queryGetPopularPosts = gql`
    query GetPopularPosts {
      posts(
        where: {
          orderby: { field: META, order: DESC }
          metaQuery: { metaArray: { key: "_post_views_count", type: NUMERIC } }
        }
        first: 5
      ) {
        edges {
          node {
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
            viewCount
          }
        }
      }
    }
  `

  const queryGetPopularPostsResponse: GetPopularPostsResponse = await request(
    GRAPHQL_API_URL,
    queryGetPopularPosts
  )
  const popularPosts: Post[] = queryGetPopularPostsResponse.posts.edges.map(
    ({ node }) => node
  )

  return {
    props: {
      fallback: {
        "api/post/featured": featuredPosts,
        "api/post/recent": recentPosts,
        "api/post/popular": popularPosts
      }
    }
  }
}
