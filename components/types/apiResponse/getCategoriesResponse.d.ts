import Category from "../category"

type GetCategoriesResponse = {
  data: {
    categories: {
      edges: {
        node: {
          name: string
        }
      }[]
    }
  }
}

export default GetCategoriesResponse
