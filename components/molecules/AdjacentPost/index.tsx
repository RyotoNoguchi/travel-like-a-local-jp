/* eslint-disable prettier/prettier */
import { useSWRDynamic, useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import { useRouter } from "next/router"

const AdjacentPost: React.FC = () => {
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<Post[]>("/api/post/adjacent", slug)
  return (
    <div>
      <div></div>
    </div>
  )
}

export default AdjacentPost
