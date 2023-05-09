/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import request, { gql } from "graphql-request"
import { GraphQLError } from "graphql"

const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<string[]>) => {
  try {
    const queryGetDates = gql`
      query GetDates {
        japanesePosts {
          edges {
            node {
              date
            }
          }
        }
      }
    `
    const { japanesePosts } = await request<{
      japanesePosts: { edges: { node: { date: string } }[] }
    }>(GRAPHQL_API_URL, queryGetDates)
    res.json(japanesePosts?.edges?.map(({ node }) => node.date))
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
