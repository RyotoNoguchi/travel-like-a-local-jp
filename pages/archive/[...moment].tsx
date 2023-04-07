// TODO アーカイブ記事一覧画面用のパス ex.) '/archive/2023' or '/archive/2023/08'
// TODO [...slug].tsxを参考にして作成する
import Head from "next/head"
import type {
  InferGetStaticPropsType,
  NextPage,
  GetStaticProps,
  GetStaticPaths
} from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { CategoryWidget, PostWidget, ArchiveWidget, AboutMe } from "components"
import { Archive, Post } from "components/types"
import axios, { AxiosResponse } from "axios"
import { API_BASE_URL } from "components/constants"
import { ParsedUrlQuery } from "querystring"
import PopularPostCards from "components/organisms/PopularPostCards"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const ArchiveListPage: NextPage<Props> = ({ fallback }) => {
  return (
    <div className="relative">
      <Head>
        <title>travel-like-a-local-jp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SWRConfig value={{ fallback }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:m-24 md:m-8">
            <div className="md:col-span-8 col-span-1">
              {/* fallbackなしだと、レンダリング後にfetcherが叩かれるため、一瞬ブランクな状態が発生する。console.logしてリロードするとundefinedになることを確認できる */}
              {/* TODO PopularPostCards参考にして、ArchivedPostCardsを作成する  */}
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
        </SWRConfig>
      </main>
    </div>
  )
}

export default ArchiveListPage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | string[] | Archive[] | string
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  Params // getStaticPathsの返り値
> = async ({ params }) => {
  // params: { moment: [ '2023', '04' ] }
  const dateArray = params?.moment
  const dateURI = dateArray?.join("/") ?? ""
  const getArchivesResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `${API_BASE_URL}/archive/${dateURI}`
  )
  const archivedPosts = getArchivesResponse.data

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
        "/api/category": categories,
        "/api/widget/archive": archiveMoments,
        "/api/author/profile": profilePictureUrl,
        [unstable_serialize(["/api/archive", dateURI])]: archivedPosts
      }
    }
  }
}

type Params = {
  moment: string[]
} & ParsedUrlQuery

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const getPostsResponse = await axios.get<string[], AxiosResponse<string[]>>(
    `${API_BASE_URL}/posts`
  )
  const dates = getPostsResponse.data.map((dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1 // Add 1 since getMonth() returns 0-11
    const year = date.getFullYear()
    return `${year}/${month}`
  })
  const uniqueMonthYear = [...new Set<string>(dates)]

  const paths = uniqueMonthYear.map((date) => ({
    params: {
      moment: [date] // momentはファイル名の[...moment].tsxの「moment」と合致させてないとエラーになる
    }
  }))
  return {
    paths,
    fallback: "blocking"
  }
}
