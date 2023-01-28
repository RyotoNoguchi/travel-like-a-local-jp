import Link from "next/link"
import { Key } from "swr"
import { useSWRWithTimeout } from "../../hooks/swr"
import { Post } from "../../types/post"

type Props = {
  post: Post
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div key={post.slug}>
      <h3>{post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
      <Link href={`${post.slug}`}>Read More</Link>
    </div>
  )
}

export default PostCard
