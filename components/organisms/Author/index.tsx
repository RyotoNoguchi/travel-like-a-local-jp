/* eslint-disable prettier/prettier */
import { useSWRDynamic } from "components/hooks/swr"
import { Post } from "components/types/post"
import Image from "next/image"
import { useRouter } from "next/router"

const Author: React.FC = () => {
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<Post>("/api/post", slug)

  if (!post || isValidating) {
    return <div>Loading now....</div>
  }

  if (error) {
    return <div>Oops, something went wrong!</div>
  }

  const author = post.author.node

  return (
    <div className="text-center h-60 mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-10 p-2">
        <Image
          alt={author.name}
          src={author.avatar.url}
          width={80}
          height={80}
          className="rounded-full inline"
        />
        <h3 className="text-white my-0 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-base text-left">{author.description}</p>
      </div>
    </div>
  )
}

export default Author
