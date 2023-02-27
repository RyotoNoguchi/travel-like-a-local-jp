/* eslint-disable prettier/prettier */
import { GraphqlGetAllSlugsResponse } from "components/types/apiResponse"
import { GraphQLError } from "graphql"
import request, { gql, Variables } from "graphql-request"
import { NextApiRequest, NextApiResponse } from "next"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<string[]>) => {
  try {
    const queryGetAllSlugs = gql`
      query getAllSlugs {
        posts {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    const { posts } = await request<
      { posts: { edges: { node: { slug: string } }[] } },
      Variables
    >(GRAPHQL_API_URL, queryGetAllSlugs)

    const slugs = posts?.edges?.map(({ node }) => node.slug)
    res.json(slugs)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
