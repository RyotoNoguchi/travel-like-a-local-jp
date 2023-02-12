import Category from "components/types/category"

type GraphQLGetCategoryResponse = {
  post: {
    categories: {
      edges: Category[]
    }
  }
}

export default GraphQLGetCategoryResponse
