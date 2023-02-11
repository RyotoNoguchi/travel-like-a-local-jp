import Category from "components/types/category"

type GetCategoriesResponse = {
  data: {
    categories: {
      edges: Category[]
    }
  }
}

export default GetCategoriesResponse
