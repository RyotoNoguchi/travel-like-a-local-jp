type GetRecentPostsResponse = {
  data: {
    posts: {
      edges: {
        node: {
          excerpt: string
          // eslint-disable-next-line prettier/prettier
          slug: string
          title: string
        }
      }[]
    }
  }
}

export default GetRecentPostsResponse
