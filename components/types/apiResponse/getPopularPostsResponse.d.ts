import { Post } from "../post"

type GetPopularPostsResponse = {
  posts: {
    edges: {
      node: Post & { viewCount: number }
    }[]
  }
}

export default GetPopularPostsResponse
