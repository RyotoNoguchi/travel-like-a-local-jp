/* eslint-disable prettier/prettier */
import Head from "next/head"
import { AxiosResponse } from "axios"
import axios from "components/api/en"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
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
          <div className="grid grid-cols-1 m-4 md:grid-cols-12 gap-12 lg:m-24 md:m-6">
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
  >(`/category/${category}`)

  const postsByCategory = getPostsByCategoryResponse.data

  // recentPosts取得
  const getRecentPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `/posts/recent`
  )
  const recentPosts = getRecentPostsResponse.data

  // archivesを取得
  const getArchiveWidgetResponse = await axios.get<
    Archive[],
    AxiosResponse<Archive[]>
  >(`/widget/archive`)
  const archiveMoments = getArchiveWidgetResponse?.data

  // profile画像を取得
  const getProfilePictureResponse = await axios.get<
    string,
    AxiosResponse<string>
  >(`/author/profile`)
  const profilePictureUrl = getProfilePictureResponse.data

  return {
    props: {
      fallback: {
        "/api/en/posts/recent": recentPosts,
        "/api/en/widget/archive": archiveMoments,
        "/api/en/author/profile": profilePictureUrl,
        [unstable_serialize(["/api/en/category", category])]: postsByCategory
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
  const res = await axios.get<string[], AxiosResponse<string[]>>(`/category`)
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
