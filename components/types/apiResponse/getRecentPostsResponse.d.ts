import { Post } from "../post"

type GetRecentPostsResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetRecentPostsResponse
