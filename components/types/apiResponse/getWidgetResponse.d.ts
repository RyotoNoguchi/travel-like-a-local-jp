import { Widget } from "components/types/widget"

type GetWidgetResponse = {
  posts: {
    edges: {
      node: Widget
    }[]
  }
}

export default GetWidgetResponse
