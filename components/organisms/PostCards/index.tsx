import { useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import PostCard from "components/molecules/PostCard"
import { Key } from "swr"

const PostCards: React.FC = () => {
  // 参考: https://kk-web.link/blog/20220629
  // 参考: https://swr.vercel.app/ja/docs/with-nextjs

  const recentPostsKey: Key = "api/posts/recent"
  const { data: recentPostsData, isValidating } =
    useSWRWithTimeout<Post[]>(recentPostsKey)

  if (isValidating) return null
  if (!recentPostsData) return null

  return (
    <>
      {recentPostsData.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}

export default PostCards
