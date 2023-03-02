/* eslint-disable prettier/prettier */
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { Post } from "components/types/post"
import { PostWidget, PostDetail, ArchiveWidget } from "components"
import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { API_BASE_URL } from "components/constants"
import Archive from "components/types/archive"
import Author from "components/organisms/Author"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: React.FC<Props> = ({ fallback }) => {
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
          <div className="col-span-3 lg:col-span-2">
            <PostDetail slug={slug} />
            <Author />
          </div>
          <div className="col-span-3 lg:col-span-1">
            <div className="relative md:sticky top-20">
              <PostWidget slug={slug} />
              <ArchiveWidget />
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
    [key: string]: Post[] | Post | Archive[]
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  GetStaticPropsParams
> = async ({ params }) => {
  const slug = params?.slug ?? "default"

  // '/api/posts/[slug]'をコールしてRelatedPostsを取得
  const relatedPostsResponse = await axios.get<Post[], AxiosResponse<Post[]>>(
    `${API_BASE_URL}/posts/${slug}`
  )
  const relatedPosts = relatedPostsResponse.data

  // '/api/post/[slug]'をコールしてPostDetailコンポーネント用のPostを取得
  const postDetailResponse = await axios.get<Post, AxiosResponse<Post>>(
    `${API_BASE_URL}/post/${slug}`
  )
  const post = postDetailResponse.data

  // '/api/widget/archive'をコールしてArchiveWidget用のArchivePostsを取得
  const archivesResponse = await axios.get<Archive[], AxiosResponse<Archive[]>>(
    `${API_BASE_URL}/widget/archive`
  )
  const archives = archivesResponse.data

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/posts", slug])]: relatedPosts,
        [unstable_serialize(["/api/post", slug])]: post,
        "/api/widget/archive": archives
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
