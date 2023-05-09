/* eslint-disable prettier/prettier */
import { Post } from "components/types/post"
import { GraphQLError } from "graphql"
import request, { gql, Variables } from "graphql-request"
import type { NextApiRequest, NextApiResponse } from "next"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  try {
    const { slug } = req.query

    console.log("slug:", slug)

    const queryGetJapanesePostDetail = gql`
      query GetPostDetail($slug: ID!) {
        japanesePost(id: $slug, idType: SLUG) {
          author {
            node {
              avatar {
                url
              }
              description
              name
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          slug
          title
        }
      }
    `
    const { japanesePost } = await request<{ japanesePost: Post }, Variables>(
      GRAPHQL_API_URL,
      queryGetJapanesePostDetail,
      { slug }
    )

    res.json(japanesePost)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
