type GetPostWidgetResponse = {
  post: {
    categories: {
      edges: {
        node: {
          name: string
        }
      }[]
    }
    // eslint-disable-next-line prettier/prettier
    slug: string
  }
}

export default GetPostWidgetResponse