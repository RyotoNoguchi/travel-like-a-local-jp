import { useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import PostCard from "components/molecules/PostCard"
import { Key } from "swr"
import { useLanguage } from "components/hooks/useLanguage"

const PopularPostCards: React.FC = () => {
  // 参考: https://kk-web.link/blog/20220629
  // 参考: https://swr.vercel.app/ja/docs/with-nextjs

  const { isEnglish } = useLanguage()
  const popularPostsKey: Key = isEnglish
    ? "/api/en/posts/popular"
    : "/api/ja/posts/popular"
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
