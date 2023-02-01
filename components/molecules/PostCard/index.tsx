import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Post } from "../../types/post"

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  console.log("PostCardコンポーネントのpost: ", post)
  const [featuredImage, setFeaturedImage] = useState(
    post?.featuredImage?.node.sourceUrl
  )
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 mb-8">
      <div className="relative overflow-hidden text-center">
        <Image
          src={
            featuredImage ??
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
          }
          alt={post.title}
          width={1000}
          height={600}
          onError={() => {
            setFeaturedImage(
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            )
          }}
          className="object-top absolute h-80 w-full object-cover shadow rounded-t-lg text-center"
        />
      </div>
      <h1 className="transition duration-300 text-center cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-2 w-full">
        <div className="flex items-center justify-center lg:mb-0 w-full lg:w-auto mr-8">
          <Image
            src={post.author.node.avatar.url}
            alt={post.author.node.name}
            width={30}
            height={30}
            className="align-middle rounded-full drop-shadow-sm shadow"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.node.name}
          </p>
        </div>
      </div>
    </div>
    // <div>
    //   <h3>{post.title}</h3>
    //   <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
    //   <Link href={`${post.slug}`}>Read More</Link>
    // </div>
  )
}

export default PostCard
