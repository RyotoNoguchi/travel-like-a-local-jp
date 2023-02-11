import { Post } from "components/types/post"

type GetPopularPostsResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetPopularPostsResponse
