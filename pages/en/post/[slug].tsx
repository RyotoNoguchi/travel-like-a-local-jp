/* eslint-disable prettier/prettier */
import Head from "next/head"
import { AxiosResponse } from "axios"
import axios from "components/api"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
  Post,
  AdjacentPosts as AdjacentPostsType,
  Archive
} from "components/types"
import {
  PostWidget,
  PostDetail,
  ArchiveWidget,
  AdjacentPosts,
  AboutMe,
  CategoryWidget
} from "components"
import { API_BASE_URL } from "components/constants"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: React.FC<Props> = ({ fallback }) => {
  const isMobile = useMediaQuery("(max-width:400px)")
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)

  return (
    <>
      <Head>
        <title>Post page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 m-4 md:grid-cols-3 md:gap-6 md:m-6 lg:gap-8 lg:m-8">
        <SWRConfig value={{ fallback }}>
          <div className="col-span-3 lg:col-span-2 mb-4">
            <PostDetail slug={slug} />
            {/* <Author /> */}
            <AdjacentPosts />
          </div>
          <div>
            <div className="sticky md:top-20">
              <AboutMe />
              <PostWidget slug={slug} />
              <ArchiveWidget />
              {isMobile && <CategoryWidget />}
            </div>
          </div>
        </SWRConfig>
      </div>
    </>
  )
}

export default PostPage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | Post | Archive[] | AdjacentPostsType | string
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  GetStaticPropsParams
> = async ({ params }) => {
  const slug = params?.slug ?? "default"

  // '/api/posts/[slug]'をコールしてRelatedPostsを取得
  const relatedPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `/posts/${slug}`
  )
  const relatedPosts = relatedPostsResponse.data

  // '/api/post/[slug]'をコールしてPostDetailコンポーネント用のPostを取得
  const postDetailResponse = await axios.get<Post, AxiosResponse<Post>>(
    `/post/${slug}`
  )
  const post = postDetailResponse.data

  // '/api/widget/archive'をコールしてArchiveWidget用のArchivePostsを取得
  const archivesResponse = await axios.get<Archive[], AxiosResponse<Archive[]>>(
    "/widget/archive"
  )
  const archives = archivesResponse.data

  // '/api/posts/adjacent/[slug]'をコールしてAdjacentPostsを取得
  const adjacentPostsResponse = await axios.get<
    AdjacentPostsType,
    AxiosResponse<AdjacentPostsType>
  >(`/posts/adjacent/${slug}`)
  const adjacentPosts = adjacentPostsResponse.data

  // profile画像を取得
  const getProfilePictureResponse = await axios.get<
    string,
    AxiosResponse<string>
  >("/author/profile")
  const profilePictureUrl = getProfilePictureResponse.data

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/en/posts", slug])]: relatedPosts,
        [unstable_serialize(["/api/en/post", slug])]: post,
        [unstable_serialize(["/api/en/posts/adjacent", slug])]: adjacentPosts,
        "/api/en/author/profile": profilePictureUrl,
        "/api/en/widget/archive": archives
      }
    }
  }
}

// getStaticPathsで返却してgetStaticPropsで引数として使用する値の型
type GetStaticPropsParams = {
  slug: string
}
export const getStaticPaths: GetStaticPaths<
  GetStaticPropsParams
> = async () => {
  const res = await axios.get<string[], AxiosResponse<string[]>>(
    `${API_BASE_URL}/posts/slug`
  )
  const slugs = res.data

  const paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug
      }
    }
  })

  return {
    paths,
    fallback: "blocking"
  }
}
