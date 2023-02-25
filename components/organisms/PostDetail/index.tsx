import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSWRDynamic, useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import moment from "moment"
import Image from "next/image"

const PostDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<Post>("/api/post", slug)
  console.log("PostDetailで呼び出した、'/api/post'の{ data }:", post)

  if (!post || isValidating) {
    return <div>Loading now....</div>
  }

  if (error) {
    return <div>Oops, something went wrong!</div>
  }

  return (
    <div className="col-span-2 bg-white mb-4 p-4 rounded-lg grid gap-4">
      <Image
        alt={post.featuredImage.node.altText}
        src={post.featuredImage.node.sourceUrl}
        width={800}
        height={500}
      />
      <div className="flex gap-4 ml-2">
        <div className="flex items-center gap-2">
          <Image
            alt={post.author.node.name}
            src={post.author.node.avatar.url}
            width={30}
            height={30}
            className="rounded-full"
          />
          <p>{post.author.node.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="w-6 text-rose-400"
          />
          <span>{moment(post.date).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div>{post.content}</div>
    </div>
  )
}

export default PostDetail
