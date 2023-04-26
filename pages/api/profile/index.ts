/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import request, { gql } from "graphql-request"
import { GraphQLError } from "graphql"
import { Author } from "components/types"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

type GetProfileResponse = {
  profile: Author & { content: string }
}

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<GetProfileResponse>
) => {
  try {
    const queryGetProfile = gql`
      query GetProfile {
        page(id: "profile", idType: URI) {
          content
          author {
            node {
              avatar {
                url
              }
              description
              firstName
              lastName
            }
          }
        }
      }
    `

    const { page } = await request<{ page: GetProfileResponse }>(
      GRAPHQL_API_URL,
      queryGetProfile
    )
    res.json(page)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
