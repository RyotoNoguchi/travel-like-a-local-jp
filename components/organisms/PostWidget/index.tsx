import { useSWRDynamicParams } from "../../hooks/swr"

type GetPostWidgetResponse = {
  categories: string[]
  // eslint-disable-next-line prettier/prettier
  slug: string
}

const PostWidget: React.FC<{ slug: string }> = ({ slug }) => {
  console.log("slug:", slug)
  // https://swr.vercel.app/ja/docs/arguments#%E8%A4%87%E6%95%B0%E3%81%AE%E5%BC%95%E6%95%B0
  // useSWRの引数に配列をを指定し、変数を第2引数以降に入れることでuseSWRがkeyを動的に認知してくれるようになる
  const { data } = useSWRDynamicParams<GetPostWidgetResponse>("/api/post", slug)

  console.log("data", data)

  return <div>{data?.categories ?? "なし"}</div>
}

export default PostWidget
