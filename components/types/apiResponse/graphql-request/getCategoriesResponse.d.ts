import Category from "components/types/category"

type GetCategoriesResponse = {
  post: {
    categories: {
      edges: Category[]
    }
  }
}

export default GetCategoriesResponse
