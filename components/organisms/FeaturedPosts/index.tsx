import FeaturedPostCard from "../../molecules/FeaturedPostCard"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import ArrowLeft from "../../atoms/ArrowLeft"
import ArrowRight from "../../atoms/ArrowRight"
import { Key } from "swr"
import { useSWRWithTimeout } from "../../hooks/swr"
import { Post } from "../../types/post"

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

const FeaturedPosts: React.FC = () => {
  const featuredPostKey: Key = "api/post/featured"

  const {
    data: featuredPostData,
    isValidating,
    error: _
  } = useSWRWithTimeout<Post[]>(featuredPostKey)

  if (isValidating) return null

  console.log("featuredPostData", featuredPostData)
  return (
    <div className="mb-8">
      <Carousel
        infinite={true}
        customLeftArrow={<ArrowLeft />}
        customRightArrow={<ArrowRight />}
        responsive={responsive}
        itemClass="px-4"
      >
        {featuredPostData?.map((post) => (
          <FeaturedPostCard key={post.slug} post={post} />
        ))}
      </Carousel>
    </div>
  )
}

export default FeaturedPosts
