import FeaturedPostCard from "components/molecules/FeaturedPostCard"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import ArrowLeft from "components/atoms/ArrowLeft"
import ArrowRight from "components/atoms/ArrowRight"
import { Key } from "swr"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Post } from "components/types/post"
import { useLanguage } from "components/hooks/useLanguage"
import Skeleton from "components/atoms/Skeleton"

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
  const { isEnglish } = useLanguage()
  const featuredPostKey: Key = isEnglish
    ? "/api/en/posts/featured"
    : "/api/ja/posts/featured"

  const {
    data: featuredPostData,
    isValidating,
    error
  } = useSWRWithTimeout<Post[]>(featuredPostKey)

  if (!featuredPostData || isValidating || error) {
    return <Skeleton width="100vw" height={288} />
  }

  return (
    <div className="mb-6 md:mb-8">
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
