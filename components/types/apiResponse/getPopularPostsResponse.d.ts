import { Post } from "components/types/post"

type GetPopularPostsResponse = {
  posts: {
    edges: {
      node: Post & { viewCount: number }
    }[]
  }
}

export default GetPopularPostsResponse
