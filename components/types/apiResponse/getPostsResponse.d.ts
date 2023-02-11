import { Post } from "components/types/post"

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
