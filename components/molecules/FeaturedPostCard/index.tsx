import React from "react"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import { Post } from "components/types/post"
import { useLanguage } from "components/hooks/useLanguage"

const FeaturedPostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { isEnglish } = useLanguage()
  return (
    <div className="relative h-72">
      <div className="absolute rounded-lg bg-center bg-gradient-to-b from-gray-400 via-gray-700 to-black w-full h-72">
        <div className="w-full h-full absolute top-0">
          <Image
            src={post?.featuredImage?.node.sourceUrl}
            alt={post?.featuredImage?.node.altText}
            fill
            className="w-full object-cover rounded-lg bg-center opacity-50"
          />
        </div>
        <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full opacity-80">
          <p className="text-white mb-4 text-shadow font-semibold text-xs">
            {moment(post.date).format("MMM DD, YYYY")}
          </p>
          <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
            {post.title}
          </p>
        </div>
        <Link
          href={isEnglish ? `/en/post/${post.slug}` : `/ja/post/${post.slug}`}
        >
          <span className="cursor-pointer absolute w-full h-full hidden">
            Read more about {post.slug}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedPostCard
