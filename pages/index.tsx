/* eslint-disable prettier/prettier */
import Head from "next/head"
import { SWRConfig } from "swr"
import {
  Hero,
  FeaturedPosts,
  CategoryWidget,
  PostWidget,
  ArchiveWidget,
  AboutMe
} from "components"
import { Post, Archive } from "components/types"
import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next"
import PopularPostCards from "components/organisms/PopularPostCards"
import { API_BASE_URL } from "components/constants"
import axios, { AxiosResponse } from "axios"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const TopPage: NextPage<Props> = ({ fallback }) => {
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
          <div className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:m-8 md:m-6">
              <div className="md:col-span-8 col-span-1">
                {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
                <PopularPostCards />
              </div>
              <div className="md:col-span-4 col-span-1 relative">
                <div className="sticky top-8 mb-8">
                  <AboutMe />
                  <PostWidget />
                  <ArchiveWidget />
                  <CategoryWidget />
                </div>
              </div>
            </div>
          </div>
        </SWRConfig>
      </main>
    </div>
  )
}

export default TopPage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | string[] | Archive[] | string
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse
> = async () => {
  // featuredPosts取得
  const getFeaturedPostsResponse = await axios.get<
    Post[],
    AxiosResponse<Post[]>
  >(`${API_BASE_URL}/posts/featured`)
  const featuredPosts = getFeaturedPostsResponse.data

  // recentPosts取得
  const getRecentPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `${API_BASE_URL}/posts/recent`
  )
  const recentPosts = getRecentPostsResponse.data

  // ウィジェット用のカテゴリー取得
  const getCategoriesResponse = await axios.get<
    string[],
    AxiosResponse<string[]>
  >(`${API_BASE_URL}/category`)
  const categories = getCategoriesResponse.data

  // popularPosts取得
  const getPopularPostsResponse = await axios.get<
    Post[],
    AxiosResponse<Post[]>
  >(`${API_BASE_URL}/posts/popular`)
  const popularPosts = getPopularPostsResponse.data

  // archivesを取得
  const getArchiveWidgetResponse = await axios.get<
    Archive[],
    AxiosResponse<Archive[]>
  >(`${API_BASE_URL}/widget/archive`)
  const archives = getArchiveWidgetResponse?.data

  // profile画像を取得
  const getProfilePictureResponse = await axios.get<
    string,
    AxiosResponse<string>
  >(`${API_BASE_URL}/author/profile`)
  const profilePictureUrl = getProfilePictureResponse.data

  return {
    props: {
      fallback: {
        "/api/posts/featured": featuredPosts,
        "/api/posts/recent": recentPosts,
        "/api/posts/popular": popularPosts,
        "/api/category": categories,
        "/api/widget/archive": archives,
        "/api/author/profile": profilePictureUrl
      }
    }
  }
}
