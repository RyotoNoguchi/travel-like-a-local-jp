import Category from "components/types/category"
import Author from "components/types/author"
import FeaturedImage from "components/types/featuredImage"

type Photo = {
  url: string
}

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

export type CategoryPostsProps = {
  posts: CategoryPosts[]
}

type CategoryPosts = {
  cursor: string
  node: Post
}

export type AdjacentPosts = {
  next: AdjacentPost
  previous: AdjacentPost
}

export type AdjacentPost = {
  createdAt: string
  featuredImage: FeaturedImage
  slug: string
  title: string
}
