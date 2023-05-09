import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Post } from "components/types/post"
import moment from "moment"
import { useLanguage } from "components/hooks/useLanguage"

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [featuredImage, setFeaturedImage] = useState(
    post.featuredImage?.node.sourceUrl
  )
  const { isEnglish } = useLanguage()
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 mb-6 md:mb-8">
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
          className="object-center h-48 md:h-80 w-full object-cover shadow rounded-t-lg text-center"
        />
      </div>
      <h1 className="transition duration-300 text-center cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={isEnglish ? `/en/post/${post.slug}` : `/post/${post.slug}`}>
          {post.title}
        </Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-2 w-full">
        <div className="flex items-center justify-center lg:mb-0 w-full lg:w-auto mr-8">
          <Image
            src={post.author?.node.avatar.url}
            alt={post.author?.node.name}
            width={30}
            height={30}
            className="align-middle rounded-full drop-shadow-sm shadow"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author?.node.name}
          </p>
        </div>
        <div className="font-medium text-gray-700 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.date).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt.replace(/(<([^>]+)>)/gi, "")}
      </p>
      <div className="text-center">
        <Link href={isEnglish ? `/en/post/${post.slug}` : `/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 mb-4 cursor-pointer">
            Continue Reading
          </span>
        </Link>
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
