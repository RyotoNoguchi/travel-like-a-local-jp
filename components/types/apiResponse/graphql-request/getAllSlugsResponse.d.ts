type GetPopularPostsResponse = {
  posts: {
    edges: {
      node: {
        slug: string
      }
    }[]
  }
}

export default GetPopularPostsResponse
