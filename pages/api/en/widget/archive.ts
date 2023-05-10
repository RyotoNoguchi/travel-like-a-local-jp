/* eslint-disable prettier/prettier */
import type { NextApiRequest, NextApiResponse } from "next"
import request, { gql } from "graphql-request"
import { GraphQLError } from "graphql"
import Archive from "components/types/archive"

const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<Archive[]>) => {
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
    const dates = posts?.edges?.map(({ node }) => node.date)
    const datesReduceResult = dates
      ? dates?.reduce<{ [key: string]: number }>((yearMonthCounts, gmt) => {
          const yyyyMM = gmt.slice(0, 7)

          if (!yearMonthCounts[yyyyMM]) {
            yearMonthCounts[yyyyMM] = 0
          }

          yearMonthCounts[yyyyMM]++

          return yearMonthCounts
        }, {})
      : []

    const postsPerMonth: Archive[] = Object.entries(datesReduceResult).map(
      ([month, count]) => ({ month, count })
    )
    res.json(postsPerMonth)
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
