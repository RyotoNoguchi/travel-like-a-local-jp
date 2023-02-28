/* eslint-disable prettier/prettier */
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { Post } from "components/types/post"
import { PostWidget, PostDetail } from "components"
import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { API_BASE_URL } from "components/constants"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const PostPage: React.FC<Props> = ({ fallback }) => {
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)

  return (
    <>
      <Head>
        <title>single post page</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href={`http://headlessnext.local/wp-includes/css/dist/block-library/style.min.css?ver=5.6`}
        />
      </Head>
      <div className="grid grid-cols-1 m-4 md:grid-cols-3 md:gap-6 md:m-6 lg:gap-8 lg:m-8">
        <PostDetail slug={slug} />
        <div>
          <SWRConfig value={{ fallback }}>
            <PostWidget slug={slug} />
          </SWRConfig>
        </div>
      </div>
    </>
  )
}

export default PostPage

type GetStaticPropsResponse = {
  fallback: {
    [key: string]: Post[] | Post
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResponse,
  GetStaticPropsParams
> = async ({ params }) => {
  const slug = params?.slug ?? "default"

  // '/api/posts/[slug]'をコールしてRelatedPostsを取得
  const relatedPostsResponse = await axios.get(`${API_BASE_URL}/posts/${slug}`)
  const relatedPosts = relatedPostsResponse.data

  // '/api/post/[slug]'をコールしてPostDetailコンポーネント用のPostを取得
  const res = await axios.get<Post, AxiosResponse<Post>>(
    `${API_BASE_URL}/post/${slug}`
  )
  const post = res.data

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/posts", slug])]: relatedPosts,
        [unstable_serialize(["/api/post", slug])]: post
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
