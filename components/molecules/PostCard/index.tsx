import Link from "next/link"
import { Post } from "../../types/post"

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
      <Link href={`${post.slug}`}>Read More</Link>
    </div>
  )
}

export default PostCard
