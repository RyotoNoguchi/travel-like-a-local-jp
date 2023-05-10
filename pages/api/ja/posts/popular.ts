/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import { Post } from "components/types/post"
import request, { gql } from "graphql-request"
import { GraphQLError } from "graphql"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<Post[]>) => {
  try {
    const queryGetPopularPosts = gql`
      query GetPopularPosts {
        posts(
          where: {
            orderby: { field: META, order: DESC }
            metaQuery: {
              metaArray: { key: "_post_views_count", type: NUMERIC }
            }
            tag: "JP"
          }
          first: 5
        ) {
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
    const { posts } = await request<{
      posts: { edges: { node: Post }[] }
    }>(GRAPHQL_API_URL, queryGetPopularPosts)
    res.json(posts?.edges?.map(({ node }) => node))
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
