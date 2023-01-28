import Category from "../category"

type GetCategoriesResponse = {
  data: {
    categories: {
      edges: {
        node: {
          name: Category
        }
      }[]
    }
  }
}

export default GetCategoriesResponse
