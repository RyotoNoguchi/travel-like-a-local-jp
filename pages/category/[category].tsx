/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse } from "axios"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { API_BASE_URL } from "components/constants"
import {
  PostWidget,
  ArchiveWidget,
  AboutMe,
  CategoryPostCards
} from "components"
import { Post, Archive } from "components/types"
import { ParsedUrlQuery } from "querystring"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: React.FC<Props> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Category page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SWRConfig value={{ fallback }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:m-24 md:m-8">
            <div className="md:col-span-8 col-span-1">
              <CategoryPostCards />
            </div>
            <div className="md:col-span-4 col-span-1 relative">
              <div className="sticky top-8 mb-8">
                <AboutMe />
                <PostWidget />
                <ArchiveWidget />
              </div>
            </div>
          </div>
        </SWRConfig>
      </main>
    </>
  )
}

export default CategoryPage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | string[] | Archive[] | string
  }
}

type Params = {
  category: string
} & ParsedUrlQuery

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  Params // getStaticPathsの返り値
> = async ({ params }) => {
  // 指定されたcategoryが紐付けられたPostsを取得
  const category = params?.category ?? "undefined"
  const getPostsByCategoryResponse = await axios.get<
    Post[],
    AxiosResponse<Post[]>
  >(`${API_BASE_URL}/category/${category}`)

  const postsByCategory = getPostsByCategoryResponse.data

  // recentPosts取得
  const getRecentPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `${API_BASE_URL}/posts/recent`
  )
  const recentPosts = getRecentPostsResponse.data

  // archivesを取得
  const getArchiveWidgetResponse = await axios.get<
    Archive[],
    AxiosResponse<Archive[]>
  >(`${API_BASE_URL}/widget/archive`)
  const archiveMoments = getArchiveWidgetResponse?.data

  // profile画像を取得
  const getProfilePictureResponse = await axios.get<
    string,
    AxiosResponse<string>
  >(`${API_BASE_URL}/author/profile`)
  const profilePictureUrl = getProfilePictureResponse.data

  return {
    props: {
      fallback: {
        "/api/posts/recent": recentPosts,
        "/api/widget/archive": archiveMoments,
        "/api/author/profile": profilePictureUrl,
        [unstable_serialize(["/api/category", category])]: postsByCategory
      }
    }
  }
}

// getStaticPathsで返却してgetStaticPropsで引数として使用する値の型
type GetStaticPropsParams = {
  category: string
}
export const getStaticPaths: GetStaticPaths<
  GetStaticPropsParams
> = async () => {
  const res = await axios.get<string[], AxiosResponse<string[]>>(
    `${API_BASE_URL}/category`
  )
  const categories = res.data

  const paths = categories.map((category) => {
    return {
      params: {
        category: category
      }
    }
  })

  return {
    paths,
    fallback: "blocking"
  }
}
