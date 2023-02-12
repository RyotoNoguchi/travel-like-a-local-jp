import Category from "components/types/category"

type GetCategoriesResponse = {
  categories: {
    edges: Category[]
  }
}

export default GetCategoriesResponse
