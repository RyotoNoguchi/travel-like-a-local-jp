/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import request, { gql } from "graphql-request"
import { GraphQLError } from "graphql"

const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<string[]>) => {
  try {
    const queryGetDates = gql`
      query GetDates {
        posts(where: { tag: "EN" }) {
          edges {
            node {
              date
            }
          }
        }
      }
    `
    const { posts } = await request<{
      posts: { edges: { node: { date: string } }[] }
    }>(GRAPHQL_API_URL, queryGetDates)
    res.json(posts?.edges?.map(({ node }) => node.date))
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
