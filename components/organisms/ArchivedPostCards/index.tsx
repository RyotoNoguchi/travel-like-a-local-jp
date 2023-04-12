import { useSWRDynamic } from "components/hooks/swr"
import { Post } from "components/types"
import { useRouter } from "next/router"

const ArchivedPostCards: React.FC = () => {
  const router = useRouter()
  const { data: archivedPosts, isValidating } = useSWRDynamic<Post[]>(
    "/api",
    router.asPath
  )

  if (isValidating) return null
  if (!archivedPosts) return null

  return (
    <>
      {/* {archivedPostsData.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))} */}
    </>
  )
}

export default ArchivedPostCards
