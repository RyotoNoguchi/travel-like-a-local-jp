import Category from "../category"

type GetCategoriesResponse = {
  data: {
    categories: {
      edges: Category[]
    }
  }
}

export default GetCategoriesResponse
