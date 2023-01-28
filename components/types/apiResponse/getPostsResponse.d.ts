import { Post } from "../post"

type GetPostsResponse = {
  data: {
    posts: {
      edges: {
        node: Post
      }[]
    }
  }
}

export default GetPostsResponse
