import { Post } from "components/types/post"

type GetFeaturedPostsResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetFeaturedPostsResponse
