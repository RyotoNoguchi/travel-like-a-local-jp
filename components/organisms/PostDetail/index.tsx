import { useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import Image from "next/image"

const PostDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useSWRWithTimeout("/api/posts")
  return (
    <div className="col-span-2 bg-red-400 mb-4">
      {/* <Image
        alt={post.featuredImage.node.altText}
        src={post.featuredImage.node.sourceUrl}
        width={800}
        height={500}
      /> */}
      PostDetail
    </div>
  )
}

export default PostDetail
