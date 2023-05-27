/* eslint-disable prettier/prettier */
import Head from "next/head"
// import { SWRConfig } from "swr"
import {
  Hero,
  FeaturedPosts,
  CategoryWidget,
  PostWidget,
  ArchiveWidget,
  AboutMe
} from "components"
// import { Post, Archive } from "components/types"
// import type { InferGetStaticPropsType, NextPage, GetStaticProps } from "next"
// import { AxiosResponse } from "axios"
// import axios from "components/api/en"
import PopularPostCards from "components/organisms/PopularPostCards"
import { INSTAGRAM_POST } from "components/constants"
import { InstagramEmbed } from "react-social-media-embed"
import { useEffect, useState } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

// type Props = InferGetStaticPropsType<typeof getStaticProps>

const TopPage = () => {
  const [isRendered, setIsRendered] = useState(false)
  const isMobile = useMediaQuery("(max-width:400px)")

  useEffect(() => {
    setIsRendered(true)
  }, [])

  return (
    <div className="relative">
      <Head>
        <title>Travel Like A Local Japan</title>
        <meta
          name="description"
          content="Get authentic and deep Japan experience traveling like a local"
        />
        <meta property="og:title" content="Travel Like A Local Japan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        {/* <SWRConfig value={{ fallback }}> */}
        <FeaturedPosts />
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 lg:m-8 md:m-6">
            <div className="md:col-span-8 col-span-1">
              {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
              <PopularPostCards />
            </div>
            <div className="md:col-span-4 col-span-1 relative">
              <div className="sticky top-8 mb-8">
                <AboutMe />
                <PostWidget />
                <ArchiveWidget />
                {isMobile && <CategoryWidget />}
                {isRendered && <InstagramEmbed url={INSTAGRAM_POST} />}
              </div>
            </div>
          </div>
        </div>
        {/* </SWRConfig> */}
      </main>
    </div>
  )
}

export default TopPage

// type GetStaticPropsResponse = {
//   fallback: {
//     [key: string]: Post[] | string[] | Archive[] | string
//   }
// }

// export const getStaticProps: GetStaticProps<
//   GetStaticPropsResponse
// > = async () => {
//   // featuredPosts取得
//   const getFeaturedPostsResponse = await axios.get<
//     Post[],
//     AxiosResponse<Post[]>
//   >("/posts/featured")
//   const featuredPosts = getFeaturedPostsResponse.data

//   // recentPosts取得
//   const getRecentPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
//     "/posts/recent"
//   )
//   const recentPosts = getRecentPostsResponse.data

//   // ウィジェット用のカテゴリー取得
//   const getCategoriesResponse = await axios.get<
//     string[],
//     AxiosResponse<string[]>
//   >("/category")
//   const categories = getCategoriesResponse.data

//   // popularPosts取得
//   const getPopularPostsResponse = await axios.get<
//     Post[],
//     AxiosResponse<Post[]>
//   >("/posts/popular")
//   const popularPosts = getPopularPostsResponse.data

//   // archivesを取得
//   const getArchiveWidgetResponse = await axios.get<
//     Archive[],
//     AxiosResponse<Archive[]>
//   >("/widget/archive")
//   const archives = getArchiveWidgetResponse?.data

//   // profile画像を取得
//   const getProfilePictureResponse = await axios.get<
//     string,
//     AxiosResponse<string>
//   >("/author/profile")
//   const profilePictureUrl = getProfilePictureResponse.data

//   return {
//     props: {
//       fallback: {
//         "/api/en/posts/featured": featuredPosts,
//         "/api/en/posts/recent": recentPosts,
//         "/api/en/posts/popular": popularPosts,
//         "/api/en/category": categories,
//         "/api/en/widget/archive": archives,
//         "/api/en/author/profile": profilePictureUrl
//       }
//     }
//   }
// }
