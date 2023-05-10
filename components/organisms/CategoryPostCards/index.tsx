import { useSWRDynamic } from "components/hooks/swr"
import PostCard from "components/molecules/PostCard"
import { Post } from "components/types"
import { useRouter } from "next/router"

const CategoryPostCards: React.FC = () => {
  const router = useRouter()
  const category = router.query.category
  const { data: postsData, isValidating } = useSWRDynamic<Post[]>(
    "/api/en/category",
    category
  )

  console.log("postsData:", postsData)
  if (isValidating) return null
  if (!postsData) return null

  return (
    <>
      {postsData.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  )
}

export default CategoryPostCards
