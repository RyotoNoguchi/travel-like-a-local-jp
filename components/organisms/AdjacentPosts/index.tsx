/* eslint-disable prettier/prettier */
import { useSWRDynamic } from "components/hooks/swr"
import { AdjacentPosts as AdjacentPostsType } from "components/types"
import { useRouter } from "next/router"
import { PREVIOUS, NEXT } from "components/constants"
import AdjacentPost from "components/molecules/AdjacentPost"

const AdjacentPosts: React.FC = () => {
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<AdjacentPostsType>("/api/posts/adjacent", slug)

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
      <div className="grid col-span-1 w-full h-72">
        <AdjacentPost post={previousPost} position={PREVIOUS} />
        <AdjacentPost post={nextPost} position={NEXT} />
      </div>
    </>
  )
}

export default AdjacentPosts
