import FeaturedPostCard from "../../molecules/FeaturedPostCard"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Post } from "../../types/post"
import ArrowLeft from "../../atoms/ArrowLeft"
import ArrowRight from "../../atoms/ArrowRight"
import { Key } from "swr"
import { useSWRWithTimeout } from "../../hooks/swr"

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

export type PostDataResponse = {
  data: { posts: { edges: { node: Post }[] } }
}

const FeaturedPosts: React.FC = () => {
  const featuredPostKey: Key = "api/post/featured"

  const {
    data: featuredPostData,
    isValidating,
    error: _
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
