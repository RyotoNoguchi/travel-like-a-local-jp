import { Post } from "components/types"
import moment from "moment"
import Link from "next/link"

type Props = {
  post?: Post
  // eslint-disable-next-line prettier/prettier
  position: "next" | "previous"
}

const AdjacentPost: React.FC<Props> = ({ post, position }) => {
  return (
    <>
      {post && (
        <Link
          href={`/post/${post.slug}`}
          className="relative w-full block h-72 mb-4 shadow-md"
        >
          <div
            className="absolute rounded-lg bg-center bg-no-repeat shadow-md inline-block w-full h-72"
            style={{
              backgroundImage: `url(${post.featuredImage.node.sourceUrl})`
            }}
          />
          {/* 影を作るためのdiv */}
          <div className="absolute rounded-lg p-4 bg-center bg-gradient-to-b opacity-50 from-gray-700 to-black w-full h-72" />
          <div className="absolute flex flex-col rounded-lg p-4 items-center justify-center w-full h-72">
            <p className="text-white text-shadow font-semibold text-xs">
              {moment(post.date).format("MMM DD, YYYY")}
            </p>
            <p className="text-white text-shadow font-semibold text-2xl text-center">
              {post.title}
            </p>
          </div>
        </Link>
      )}
    </>
  )
}

export default AdjacentPost
