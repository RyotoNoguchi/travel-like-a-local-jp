/* eslint-disable prettier/prettier */
import { Post } from "components/types/post"
import { GraphQLError } from "graphql"
import request, { gql, Variables } from "graphql-request"
import type { NextApiRequest, NextApiResponse } from "next"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  try {
    const { slug } = req.query

    const queryGetPostDetail = gql`
      query GetPostDetail($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          author {
            node {
              avatar {
                url
              }
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
    const { post } = await request<{ post: Post }, Variables>(
      GRAPHQL_API_URL,
      queryGetPostDetail,
      { slug }
    )
    res.json(post)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
