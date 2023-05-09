/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import { GRAVATAR_API_URL, EMAIL_HASH } from "components/constants"
import request, { gql, Variables } from "graphql-request"
import { GraphQLError } from "graphql"
import { Author } from "components/types"
import { GRAPHQL_API_URL, USER_ID } from "components/constants"

const handler = async (_: NextApiRequest, res: NextApiResponse<Author>) => {
  try {
    const url = `${GRAVATAR_API_URL}/${EMAIL_HASH}?d=404`
    const response = await fetch(url)
    if (response.status === 404) {
      return null
    }

    const queryGetAuthor = gql`
      query GetAuthor($id: ID!) {
        user(id: $id, idType: ID) {
          description
          firstName
          lastName
        }
      }
    `
    const { user } = await request<{ user: Author }, Variables>(
      GRAPHQL_API_URL,
      queryGetAuthor,
      { id: USER_ID }
    )

    const author: Author = {
      avatar: {
        url: response.url
      },
      description: user.description,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}` ?? "Unknown Author"
    }

    res.json(author)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
