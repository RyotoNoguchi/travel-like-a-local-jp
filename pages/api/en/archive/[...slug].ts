/* eslint-disable prettier/prettier */
import request, { gql } from "graphql-request"
import { Post } from "components/types/post"
import type { NextApiRequest, NextApiResponse } from "next"
import { GraphQLError } from "graphql"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  try {
    const {
      query: { slug } // ex. query: { slug: [ 'archive', '2023', '02' ] } というように配列で取得される
    } = req
    console.log("slug:", slug)
    const arraySlug = slug as string[]
    const year = parseInt(arraySlug[0])
    const month = parseInt(arraySlug[1])

    const queryGetArchives = gql`
      query GetArchives($month: Int!, $year: Int!) {
        posts(where: { dateQuery: { month: $month, year: $year } }) {
          edges {
            node {
              slug
              title
              excerpt
              date
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              author {
                node {
                  avatar {
                    url
                  }
                  description
                  name
                }
              }
            }
          }
        }
      }
    `

    const { posts: archives } = await request<{
      posts: { edges: { node: Post }[] }
    }>(GRAPHQL_API_URL, queryGetArchives, {
      month,
      year
    })

    const response = archives?.edges?.map(({ node }) => node)
    res.json(response)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
