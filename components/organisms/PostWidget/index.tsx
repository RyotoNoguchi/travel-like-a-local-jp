import { useSWRDynamicParams, useSWRWithTimeout } from "components/hooks/swr"
import { Widget } from "components/types/widget"
import Image from "next/image"
import moment from "moment"
import Link from "next/link"

type GetPostWidgetResponse = {
  categories: string[]
  // eslint-disable-next-line prettier/prettier
  slug: string
}

const PostWidget: React.FC<{ slug?: string }> = ({ slug }) => {
  console.log("slug:", slug)
  // https://swr.vercel.app/ja/docs/arguments#%E8%A4%87%E6%95%B0%E3%81%AE%E5%BC%95%E6%95%B0
  // useSWRの引数に配列をを指定し、変数を第2引数以降に入れることでuseSWRがkeyを動的に認知してくれるようになる
  // const { data } = useSWRDynamicParams<GetPostWidgetResponse>("/api/post", slug)

  const { data: recentPosts } =
    useSWRWithTimeout<Widget[]>("/api/widget/recent")
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Recent Posts</h3>
      {recentPosts?.map((post) => (
        // eslint-disable-next-line react/jsx-key
        <Link href={`/post/${post.slug}`} key={post.title}>
          <div className="flex items-center mb-4">
            <Image
              alt={post.title}
              src={post.featuredImage?.node.sourceUrl}
              width={64}
              height={64}
              className="rounded-full h-16"
            />
            <div className="ml-4">
              <p className="text-gray-500 md:text-xs">
                {moment(post.date).format("MMM DD, YYYY")}
              </p>
              <p className="md:text-sm lg:text-base">{post.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
