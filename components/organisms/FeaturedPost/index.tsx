import FeaturedPostCard from "../../molecules/FeaturedPostCard"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { FeaturedPost } from "../../types/post"
import ArrowLeft from "../../atoms/ArrowLeft"
import ArrowRight from "../../atoms/ArrowRight"
import useSWR, { Key, Fetcher, SWRResponse } from "swr"
import axios, { AxiosResponse, AxiosError } from "axios"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
}

function useSWRWithTimeout<T>(key: Key): SWRResponse<T> {
  const fetcher: Fetcher<T, string> = (apiPath) =>
    axios
      .get<T, AxiosResponse<T, AxiosError>, Config>(apiPath, { timeout: 10000 })
      .then((res) => res.data)
  return useSWR<T, Error>(key, fetcher, { shouldRetryOnError: false })
}

type Config = {
  timeout: number
}

export type PostDataResponse = {
  data: Post
}

type Post = {
  posts: Posts
}

type Posts = {
  edges: PostNode[]
}

type PostNode = {
  node: FeaturedPost
}

const FeaturedPosts: React.FC = () => {
  const featuredPostKey: Key = "api/post/featured"

  const {
    data: featuredPostData,
    isValidating,
    error: postError
  } = useSWRWithTimeout<PostDataResponse>(featuredPostKey)

  if (isValidating) return null

  return (
    <div className="mb-8">
      <Carousel
        infinite={true}
        customLeftArrow={<ArrowLeft />}
        customRightArrow={<ArrowRight />}
        responsive={responsive}
        itemClass="px-4"
      >
        {featuredPostData?.data.posts.edges.map(({ node }) => (
          <FeaturedPostCard key={node.slug} post={node} />
        ))}
      </Carousel>
    </div>
  )
}

export default FeaturedPosts
