type GetFeaturedPostsResponse = {
  posts: {
    edges: {
      node: {
        excerpt: string
        // eslint-disable-next-line prettier/prettier
        slug: string
        title: string
        date: string
        categories: {
          edges: Category[]
        }
        featuredImage: FeaturedImage
        author: Author
        content: string
      }
    }[]
  }
}

export default GetFeaturedPostsResponse
