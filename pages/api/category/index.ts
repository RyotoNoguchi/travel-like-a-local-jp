/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import request, { gql } from "graphql-request"
import Category from "components/types/category"
import { GraphQLError } from "graphql"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<string[]>) => {
  try {
    const queryGetCategories = gql`
      query GetCategories {
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    `

    const { categories } = await request<{ categories: { edges: Category[] } }>(
      GRAPHQL_API_URL,
      queryGetCategories
    )

    res.json(categories?.edges?.map(({ node }) => node.name))
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
