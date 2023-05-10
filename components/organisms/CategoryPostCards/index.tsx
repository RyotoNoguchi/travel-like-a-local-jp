import { useSWRDynamic } from "components/hooks/swr"
import { useLanguage } from "components/hooks/useLanguage"
import PostCard from "components/molecules/PostCard"
import { Post } from "components/types"
import { useRouter } from "next/router"

const CategoryPostCards: React.FC = () => {
  const { isEnglish } = useLanguage()
  const router = useRouter()
  const category = router.query.category
  const { data: postsData, isValidating } = useSWRDynamic<Post[]>(
    isEnglish ? "/api/en/category" : "/api/ja/category",
    category
  )

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
