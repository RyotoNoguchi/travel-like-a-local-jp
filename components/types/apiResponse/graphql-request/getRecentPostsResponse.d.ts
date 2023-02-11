import { Post } from "components/types/post"

type GetRecentPostsResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetRecentPostsResponse
