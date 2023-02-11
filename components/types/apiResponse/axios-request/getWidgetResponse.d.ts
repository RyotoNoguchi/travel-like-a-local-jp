import { Widget } from "components/types/widget"

type GetWidgetResponse = {
  data: {
    posts: {
      edges: {
        node: Widget
      }[]
    }
  }
}

export default GetWidgetResponse
