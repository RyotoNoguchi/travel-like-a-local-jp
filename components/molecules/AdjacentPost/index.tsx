import { Post } from "components/types"
import moment from "moment"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useLanguage } from "components/hooks/useLanguage"
import Image from "next/image"

type Props = {
  post?: Post
  // eslint-disable-next-line prettier/prettier
  position: "next" | "previous"
}

const AdjacentPost: React.FC<Props> = ({ post, position }) => {
  const { isEnglish } = useLanguage()
  if (!post) {
    return null
  }
  return (
    <>
      {post && (
        <Link
          href={isEnglish ? `/en/post/${post.slug}` : `/ja/post/${post.slug}`}
          className="relative w-full block h-72 lg:h-80 mb-4 shadow-md"
        >
          {/* 影を作るためのdiv */}
          <div className="absolute rounded-lg p-4 bg-center bg-gradient-to-b opacity-50 from-gray-700 to-black w-full h-72 lg:h-80" />
          <div className="absolute flex flex-col rounded-lg p-4 items-center justify-center w-full h-72 lg:h-80 adjacent-post">
            <p className="text-white text-shadow font-semibold text-xs z-10">
              {moment(post.date).format("MMM DD, YYYY")}
            </p>
            <p className="text-white text-shadow font-semibold text-2xl text-center z-10">
              {post.title}
            </p>
            {position === "previous" ? (
              <div className="flex justify-center w-16 h-16 absolute bottom-4 left-4 cursor-pointer bg-pink-600 py-4 rounded-full text-slate-200 arrow-btn z-10">
                <FontAwesomeIcon icon={faArrowLeft} className="w-8 h-8" />
              </div>
            ) : (
              <div className="flex justify-center w-16 h-16 absolute bottom-4 right-4 cursor-pointer bg-pink-600 py-4 rounded-full text-slate-200 arrow-btn z-10">
                <FontAwesomeIcon icon={faArrowRight} className="w-8 h-8" />
              </div>
            )}
            <div className="w-full h-full absolute top-0">
              <Image
                src={post?.featuredImage?.node.sourceUrl}
                alt={post?.featuredImage?.node.altText}
                fill
                className="w-full object-cover rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-700 z-0"
              />
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default AdjacentPost
