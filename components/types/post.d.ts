import Category from "components/types/category"
import Author from "components/types/author"
import FeaturedImage from "components/types/featuredImage"

export type Post = {
  author: Author
  // eslint-disable-next-line prettier/prettier
  categories: {
    edges: Category[]
  }
  content: string
  date: string
  excerpt: string
  featuredImage: FeaturedImage
  slug: string
  title: string
}

export default Post
