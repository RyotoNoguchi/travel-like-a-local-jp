/* eslint-disable prettier/prettier */
import { useSWRDynamic } from "components/hooks/swr"
import { AdjacentPosts as AdjacentPostsType } from "components/types"
import { useRouter } from "next/router"
import { PREVIOUS, NEXT } from "components/constants"
import AdjacentPost from "components/molecules/AdjacentPost"
import { useLanguage } from "components/hooks/useLanguage"

const AdjacentPosts: React.FC = () => {
  const { isEnglish } = useLanguage()
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<AdjacentPostsType>(
    isEnglish ? "/api/en/posts/adjacent" : "/api/ja/posts/adjacent",
    slug
  )

  if (!post || isValidating) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Sorry, something went wrong...</div>
  }

  const previousPost = post[PREVIOUS]
  const nextPost = post[NEXT]

  return (
    <>
      <AdjacentPost post={previousPost} position={PREVIOUS} />
      <AdjacentPost post={nextPost} position={NEXT} />
    </>
  )
}

export default AdjacentPosts
