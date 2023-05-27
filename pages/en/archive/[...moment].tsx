/* eslint-disable prettier/prettier */
import Head from "next/head"
// import type {
//   InferGetStaticPropsType,
//   NextPage,
//   GetStaticProps,
//   GetStaticPaths
// } from "next"
// import { SWRConfig, unstable_serialize } from "swr"
import {
  CategoryWidget,
  PostWidget,
  ArchiveWidget,
  AboutMe,
  ArchivedPostCards
} from "components"
// import { Archive, Post } from "components/types"
// import { AxiosResponse } from "axios"
// import axios from "components/api/en"
// import { ParsedUrlQuery } from "querystring"
import useMediaQuery from "@mui/material/useMediaQuery"

// type Props = InferGetStaticPropsType<typeof getStaticProps>

const ArchiveListPage = ({ moment = "test" }) => {
  const isMobile = useMediaQuery("(max-width:767px)")
  return (
    <div className="relative">
      <Head>
        <title>Archives in {moment} - Travel Like A Local Japan</title>
        <meta name="description" content={`Archives in ${moment}`} />
        <meta
          property="og:title"
          content={`Archives in ${moment} - Travel Like A Local Japan`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <SWRConfig value={{ fallback }}> */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 m-4 lg:m-24 md:m-8">
          <div className="md:col-span-8 col-span-1">
            {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
            <ArchivedPostCards />
          </div>
          <div className="md:col-span-4 col-span-1 relative">
            <div className="sticky top-8 mb-8">
              <AboutMe />
              <PostWidget />
              <ArchiveWidget />
              {isMobile && <CategoryWidget />}
            </div>
          </div>
        </div>
        {/* </SWRConfig> */}
      </main>
    </div>
  )
}

export default ArchiveListPage

// type GetStaticPropsResponse = {
//   fallback: {
//     [key: string]: Post[] | string[] | Archive[] | string
//   }
//   moment: string
// }

// export const getStaticProps: GetStaticProps<
//   GetStaticPropsResponse,
//   Params // getStaticPathsの返り値
// > = async ({ params }) => {
//   // params: { moment: [ '2023', '04' ] }
//   const dateArray = params?.moment
//   const moment = dateArray?.join("/") ?? ""
//   const getArchivesResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
//     `/archive/${moment}`
//   )
//   const archivedPosts = getArchivesResponse.data

//   // recentPosts取得
//   const getRecentPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
//     `/posts/recent`
//   )
//   const recentPosts = getRecentPostsResponse.data

//   // ウィジェット用のカテゴリー取得
//   const getCategoriesResponse = await axios.get<
//     string[],
//     AxiosResponse<string[]>
//   >(`/category`)
//   const categories = getCategoriesResponse.data

//   // archivesを取得
//   const getArchiveWidgetResponse = await axios.get<
//     Archive[],
//     AxiosResponse<Archive[]>
//   >(`/widget/archive`)
//   const archiveMoments = getArchiveWidgetResponse?.data

//   // profile画像を取得
//   const getProfilePictureResponse = await axios.get<
//     string,
//     AxiosResponse<string>
//   >(`/author/profile`)
//   const profilePictureUrl = getProfilePictureResponse.data

//   return {
//     props: {
//       fallback: {
//         "/api/en/posts/recent": recentPosts,
//         "/api/en/category": categories,
//         "/api/en/widget/archive": archiveMoments,
//         "/api/en/author/profile": profilePictureUrl,
//         [unstable_serialize(["/api", `/en/archive/${moment}`])]: archivedPosts
//       },
//       moment
//     }
//   }
// }

// type Params = {
//   moment: string[]
// } & ParsedUrlQuery

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const getPostsResponse = await axios.get<string[], AxiosResponse<string[]>>(
//     `/posts`
//   )
//   const dates = getPostsResponse.data.map((dateString) => {
//     const date = new Date(dateString)
//     const month = date.getMonth() + 1 // Add 1 since getMonth() returns 0-11
//     const year = date.getFullYear()
//     return `${year}/${month}`
//   })
//   const uniqueMonthYear = [...new Set<string>(dates)]

//   const paths = uniqueMonthYear.map((date) => ({
//     params: {
//       moment: [date] // momentはファイル名の[...moment].tsxの「moment」と合致させてないとエラーになる
//     }
//   }))
//   return {
//     paths,
//     fallback: "blocking"
//   }
// }
