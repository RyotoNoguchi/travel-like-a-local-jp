import { useSWRWithTimeout } from "../../hooks/swr"
import { Post } from "../../types/post"
import PostCard from "../../molecules/PostCard"
import { Key } from "swr"
import { useState } from "react"

const PostCards: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const recentPostsKey: Key = "api/post/recent"
  const { data: recentPostsData, isValidating } =
    useSWRWithTimeout<Post[]>(recentPostsKey)

  if (!posts && (isValidating || !recentPostsData)) {
    return <div>PostCard</div>
  }

  console.log("posts", posts)
  console.log("recentPostsData", recentPostsData)

  return (
    <>
      {(recentPostsData != null ? recentPostsData : posts).map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}

export default PostCards
