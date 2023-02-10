import { useSWRWithTimeout } from "../../hooks/swr"
import { Post } from "../../types/post"
import PostCard from "../../molecules/PostCard"
import { Key } from "swr"

const PopularPostCards: React.FC = () => {
  // 参考: https://kk-web.link/blog/20220629
  // 参考: https://swr.vercel.app/ja/docs/with-nextjs

  const popularPostsKey: Key = "api/post/popular"
  const { data: popularPostsData, isValidating } =
    useSWRWithTimeout<Post[]>(popularPostsKey)

  if (isValidating) return null
  if (!popularPostsData) return null

  return (
    <>
      {popularPostsData.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}

export default PopularPostCards
