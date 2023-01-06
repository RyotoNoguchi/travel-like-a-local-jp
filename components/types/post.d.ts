import { Category } from "./category"

type Content = {
  raw: Raw
}

type Raw = {
  children: TypeObject[]
}

export type TypeObject = {
  children: ChildrenObject[]
  // eslint-disable-next-line prettier/prettier
  type: string
  bold: boolean | undefined
  italic: boolean | undefined
  underline: boolean | undefined
  src: string | undefined
  title: string | undefined
  width: number | undefined
  height: number | undefined
  mineType: string | undefined
  handle: string | undefined
}

export type ChildrenObject = {
  text: string
  type: string
  href: string
  italic: boolean
  bold: boolean
  underline: boolean
  children: ObjectChild[]
}

type ObjectChild = {
  text: string
  children: ListObjectChild[]
}

type ListObjectChild = {
  text: string
  children: ListObjectChild2[]
}

type ListObjectChild2 = {
  children: ListObjectChild3[]
  text: string
}

type ListObjectChild3 = {
  text: string
  children: ListObjectChild4[]
}

type ListObjectChild4 = {
  href: string
  text: string
  children: ListObjectChild5[]
}

type ListObjectChild5 = {
  text: string
  children: ListObjectChild6[]
}

type ListObjectChild6 = {
  children: ListObjectChild7[]
}

type ListObjectChild7 = {
  text: string
}

type FeaturedImage = {
  url: string
}

export type Author = {
  bio: string
  id: string
  name: string
  photo: Photo
}

type Photo = {
  url: string
}

export type Post = {
  author: Author
  categories: Category[]
  content: Content
  createdAt: string
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

export type FeaturedPost = {
  author: Author
  categories: Category
  createdAt: string
  featuredImage: FeaturedImage
  excerpt: string
  slug: string
  title: string
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
