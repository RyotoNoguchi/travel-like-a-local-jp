import axios from "axios"
import useSWR from "swr"

type GetPostDetailResponse = {
  categories: string[]
  // eslint-disable-next-line prettier/prettier
  slug: string
}

const PostWidget: React.FC<{ slug: string }> = ({ slug }) => {
  const fetcher = (url: string, slug: string) =>
    axios.get(`${url}/${slug}`, { timeout: 10000 }).then((res) => res.data)

  // TODO useSWRDynamicParamsとしてexportしたのを使用するよに変更
  const { data } = useSWR(
    ["/api/post", slug],
    ([url, slug]: [string, string]) => fetcher(url, slug)
  )
  console.log("PostWidgetのdata:", data)
  return <div>{data?.categories ?? "なし"}</div>
}

export default PostWidget
