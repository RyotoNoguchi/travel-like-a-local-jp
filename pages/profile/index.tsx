import Head from "next/head"
import axios, { AxiosResponse } from "axios"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig } from "swr"
import { API_BASE_URL } from "components/constants"
import { PostWidget, ArchiveWidget, Profile } from "components"
import { Post, Archive, Profile as ProfileType } from "components/types"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const ProfilePage: React.FC<Props> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Category page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4">
        <SWRConfig value={{ fallback }}>
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-12 lg:m-24 md:m-8">
            <div className="md:col-span-8 col-span-1">
              <Profile />
            </div>
            <div className="md:col-span-4 col-span-1 relative">
              <div className="sticky top-8 mb-8">
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

export default ProfilePage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | Archive[] | string | ProfileType
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse
> = async () => {
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

  // profileデータを取得
  const getProfileResponse = await axios.get<
    ProfileType,
    AxiosResponse<ProfileType>
  >(`${API_BASE_URL}/profile`)
  const profile = getProfileResponse.data

  return {
    props: {
      fallback: {
        "/api/posts/recent": recentPosts,
        "/api/widget/archive": archiveMoments,
        "/api/profile": profile
      }
    }
  }
}
