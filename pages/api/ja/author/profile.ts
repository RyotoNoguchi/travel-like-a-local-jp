/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import { GRAVATAR_API_URL, EMAIL_HASH } from "components/constants"
// import request, { gql, Variables } from "graphql-request"
import { GraphQLError } from "graphql"
import { Author } from "components/types"
import {
  // GRAPHQL_API_URL,
  // USER_ID,
  // DEEPL_API_KEY,
  // DEEPL_API_URL,
  INTRODUCTION_IN_JP,
  LAST_NAME_IN_JP,
  FIRST_NAME_IN_JP
} from "components/constants"
// import axios from "axios"

// DeepLのAPI使って翻訳しようと思ったが、翻訳ではなく違和感があったのでコメントアウトして定数設定
// const translate = async (text: string): Promise<string> => {
//   try {
//     const response = await axios.post<{ translations: { text: string }[] }>(
//       DEEPL_API_URL,
//       {
//         text,
//         target_lang: "JA"
//       },
//       {
//         headers: {
//           Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     )
//     return response.data?.translations[0].text ?? ""
//   } catch (error) {
//     console.error(error)
//     return ""
//   }
// }

const handler = async (_: NextApiRequest, res: NextApiResponse<Author>) => {
  try {
    const url = `${GRAVATAR_API_URL}/${EMAIL_HASH}?d=404`
    const response = await fetch(url)
    if (response.status === 404) {
      return null
    }

    // const queryGetAuthor = gql`
    //   query GetAuthor($id: ID!) {
    //     user(id: $id, idType: ID) {
    //       description
    //       firstName
    //       lastName
    //     }
    //   }
    // `

    // const { user } = await request<{ user: Author }, Variables>(
    //   GRAPHQL_API_URL,
    //   queryGetAuthor,
    //   { id: USER_ID }
    // )

    // const description = await translate(user.description)

    // const firstName = await translate(user.firstName ?? "John")
    // const lastName = await translate(user.lastName ?? "Goodman")

    const author: Author = {
      avatar: {
        url: response.url
      },
      description: INTRODUCTION_IN_JP,
      firstName: FIRST_NAME_IN_JP,
      lastName: LAST_NAME_IN_JP,
      name: `${LAST_NAME_IN_JP} ${LAST_NAME_IN_JP}`
    }
    res.json(author)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
