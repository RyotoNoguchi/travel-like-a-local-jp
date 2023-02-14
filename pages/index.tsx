/* eslint-disable prettier/prettier */
import Head from "next/head"
import { SWRConfig } from "swr"
import {
  Hero,
  FeaturedPosts,
  CategoryWidget,
  PostWidget,
  ArchiveWidget
} from "components"
import {
  GraphqlGetRecentPostsResponse,
  GraphqlGetFeaturedPostsResponse,
  GraphqlGetPopularPostsResponse,
  GraphqlGetWidgetResponse,
  GraphqlGetCategoriesResponse
} from "components/types/apiResponse"
import { Post } from "components/types/post"
import { Widget } from "components/types/widget"
import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next"
import request, { gql } from "graphql-request"
import PopularPostCards from "components/organisms/PopularPostCards"
import Archive from "components/types/archive"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ fallback }) => {
  console.log("fallback:", fallback)

  // TODO 各コンポーネントのフォールバックに<Skeleton />を使用するように変更
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:m-24 md:m-8">
            <div className="md:col-span-8 col-span-1">
              {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
              {/* <SWRConfig value={{ fallback }}> */}
              <PopularPostCards />
              {/* </SWRConfig> */}
            </div>
            <div className="md:col-span-4 col-span-1 relative">
              <div className="sticky top-8 mb-8">
                {/* <SWRConfig value={{ fallback }}> */}
                <PostWidget />
                <ArchiveWidget />
                <CategoryWidget />
                {/* </SWRConfig> */}
              </div>
            </div>
          </div>
        </SWRConfig>
      </main>
    </div>
  )
}

export default Home

type GetStaticPropsResponse = {
  fallback: {
    "/api/post/featured": Post[]
    "/api/post/recent": Post[]
    "/api/post/popular": Post[]
    "/api/widget/recent": Widget[]
    "/api/category": string[]
    "/api/widget/archive": Archive[]
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
  const getFeaturedPostsResponse: GraphqlGetFeaturedPostsResponse =
    await request(GRAPHQL_API_URL, queryGetFeaturedPosts)
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
  const queryGetRecentPostsResponse: GraphqlGetRecentPostsResponse =
    await request(GRAPHQL_API_URL, queryGetRecentPosts)
  const recentPosts: Post[] = queryGetRecentPostsResponse.posts.edges.map(
    ({ node }) => node
  )

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
          }
        }
      }
    }
  `

  const queryGetPopularPostsResponse: GraphqlGetPopularPostsResponse =
    await request(GRAPHQL_API_URL, queryGetPopularPosts)
  const popularPosts: Post[] = queryGetPopularPostsResponse.posts.edges.map(
    ({ node }) => node
  )

  // ウィジェット用のPostの情報取得
  const queryGetRecentPostsForWidget = gql`
    query GetRecentPostForWidget {
      posts(where: { orderby: { field: DATE, order: DESC } }, first: 3) {
        edges {
          node {
            title
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
          }
        }
      }
    }
  `

  const queryGetWidgetResponse: GraphqlGetWidgetResponse = await request(
    GRAPHQL_API_URL,
    queryGetRecentPostsForWidget
  )

  const recentPostsForWidget: Widget[] = queryGetWidgetResponse.posts.edges.map(
    ({ node }) => node
  )

  // ウィジェット用のカテゴリー取得
  const queryGetCategories = gql`
    query GetCategories {
      categories {
        edges {
          node {
            name
          }
        }
      }
    }
  `

  const queryGetCategoriesResponse: GraphqlGetCategoriesResponse =
    await request(GRAPHQL_API_URL, queryGetCategories)

  const categories = queryGetCategoriesResponse.categories.edges.map(
    ({ node }) => node.name
  )

  // 過去の月別の記事数取得のために全記事取得し、月ごとのオブジェクト配列化

  const queryGetAllPosts = gql`
    query GetAllPosts {
      posts {
        edges {
          node {
            date
          }
        }
      }
    }
  `

  const queryGetAllPostsResponse: {
    posts: { edges: { node: { date: string } }[] }
  } = await request(GRAPHQL_API_URL, queryGetAllPosts)

  const dates = queryGetAllPostsResponse?.posts?.edges.map(
    ({ node }) => node.date
  )

  const datesReduceResult = dates.reduce<{ [key: string]: number }>(
    (yearMonthCounts, gmt) => {
      const yyyyMM = gmt.slice(0, 7)

      if (!yearMonthCounts[yyyyMM]) {
        yearMonthCounts[yyyyMM] = 0
      }

      yearMonthCounts[yyyyMM]++

      return yearMonthCounts
    },
    {}
  )

  const postsPerMonth: Archive[] = Object.entries(datesReduceResult).map(
    ([month, count]) => ({ month, count })
  )

  return {
    props: {
      fallback: {
        "/api/post/featured": featuredPosts,
        "/api/post/recent": recentPosts,
        "/api/post/popular": popularPosts,
        "/api/widget/recent": recentPostsForWidget,
        "/api/category": categories,
        "/api/widget/archive": postsPerMonth
      }
    }
  }
}
