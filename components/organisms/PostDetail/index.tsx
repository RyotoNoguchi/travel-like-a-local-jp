import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSWRDynamic } from "components/hooks/swr"
import { useLanguage } from "components/hooks/useLanguage"
import { Post } from "components/types/post"
import moment from "moment"
import Image from "next/image"

const PostDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { isEnglish } = useLanguage()
  const {
    data: post,
    isValidating,
    error
  } = useSWRDynamic<Post>(isEnglish ? "/api/en/post" : "/api/ja/post", slug)

  if (!post || isValidating) {
    return <div>Loading now....</div>
  }

  if (error) {
    return <div>Oops, something went wrong!</div>
  }

  return (
    <div className="bg-white mb-4 p-4 rounded-lg content-wrapper">
      {/* featuredイメージ */}
      {/* <div className="flex justify-center">
        <Image
          alt={post.featuredImage.node.altText}
          src={post.featuredImage.node.sourceUrl}
          width={800}
          height={500}
        />
      </div> */}
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

      {/* 執筆者と日付セクション */}
      <div className="flex justify-end gap-4 ml-2">
        <div className="flex items-center gap-2">
          <Image
            alt={post.author.node.name}
            src={
              "http://travellikealocaljp.local/wp-content/uploads/2023/02/portraitのコピー-1-981x1024.jpg"
            }
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
    </div>
  )
}

export default PostDetail
