import { Post } from "../post"

type GetFeaturedPostsResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetFeaturedPostsResponse
