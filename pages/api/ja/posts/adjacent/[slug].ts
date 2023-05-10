/* eslint-disable prettier/prettier */
import axios from "components/api/ja"
import { Post } from "components/types/post"
import { AdjacentPosts } from "components/types"
import { GraphQLError } from "graphql"
import request, { gql } from "graphql-request"
import { NextApiRequest, NextApiResponse } from "next"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AdjacentPosts | []>
) => {
  const {
    query: { slug }
  } = req

  const response = await axios.get<Post>(`/post/${slug}`)
  const currentPost = response.data
  const year = parseInt(currentPost.date.substring(0, 4))
  const month = parseInt(currentPost.date.substring(5, 7))
  const day = parseInt(currentPost.date.substring(8, 10))
  const currentSlug = currentPost.slug

  try {
    const queryGetPreviousAdjacentPost = gql`
      query GetPreviousAdjacentPosts(
        $slug: ID!
        $month: Int!
        $day: Int!
        $year: Int!
      ) {
        posts(
          first: 1
          where: {
            dateQuery: {
              column: DATE
              before: { month: $month, day: $day, year: $year }
            }
            orderby: { field: DATE, order: DESC }
            excludeBySlug: $slug
            tag: "JP"
          }
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

    // 1つ前のPostを取得
    const { posts: previousAdjacentPosts } = await request<{
      posts: { edges: { node: Post }[] }
    }>(GRAPHQL_API_URL, queryGetPreviousAdjacentPost, {
      month,
      year,
      day,
      slug: currentSlug
    })
    const previousAdjacentPost = previousAdjacentPosts.edges.map(
      ({ node }) => node
    )[0]

    // 次のPostを取得
    const queryGetNextAdjacentPost = gql`
      query GetPreviousAdjacentPosts(
        $slug: ID!
        $month: Int!
        $day: Int!
        $year: Int!
      ) {
        posts(
          first: 1
          where: {
            dateQuery: {
              column: DATE
              after: { month: $month, day: $day, year: $year }
            }
            orderby: { field: DATE, order: ASC }
            excludeBySlug: $slug
            tag: "JP"
          }
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
    const { posts: nextAdjacentPosts } = await request<{
      posts: { edges: { node: Post }[] }
    }>(GRAPHQL_API_URL, queryGetNextAdjacentPost, {
      month,
      year,
      day,
      slug: currentSlug
    })

    const nextAdjacentPost = nextAdjacentPosts.edges.map(({ node }) => node)[0]

    const adjacentPosts = {
      previous: previousAdjacentPost,
      next: nextAdjacentPost
    }
    res.json(adjacentPosts)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
