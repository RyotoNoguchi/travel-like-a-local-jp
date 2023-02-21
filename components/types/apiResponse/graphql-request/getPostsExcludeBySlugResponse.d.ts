import { Post } from "components/types/post"

type GetPostsExcludeBySlugResponse = {
  posts: {
    edges: {
      node: Post
    }[]
  }
}

export default GetPostsExcludeBySlugResponse
