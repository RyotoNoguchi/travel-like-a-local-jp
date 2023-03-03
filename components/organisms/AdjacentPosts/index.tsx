/* eslint-disable prettier/prettier */
import { useSWRDynamic } from "components/hooks/swr"
import { AdjacentPosts as AdjacentPostsType } from "components/types"
import { useRouter } from "next/router"
import { PREVIOUS, NEXT } from "components/constants"

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
      <div
        className="rounded-lg bg-center bg-no-repeat shadow-md inline-block w-full h-72"
        style={{
          backgroundImage: `url(${previousPost.featuredImage.node.sourceUrl})`
        }}
      />
      <div className="">
        <p className="">{previousPost.title}</p>
      </div>
    </>
  )
}

export default AdjacentPosts
