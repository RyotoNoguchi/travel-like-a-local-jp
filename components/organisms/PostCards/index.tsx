import { useSWRWithTimeout } from "../../hooks/swr"
import { Post } from "../../types/post"
import PostCard from "../../molecules/PostCard"
import { Key } from "swr"

const PostCards: React.FC = () => {
  const recentPostsKey: Key = "api/post/recent"
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
