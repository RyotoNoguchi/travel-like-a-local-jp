import { Widget } from "components/types/widget"

type GetRecentPostsResponse = {
  posts: {
    edges: {
      node: Widget
    }[]
  }
}

export default GetRecentPostsResponse
