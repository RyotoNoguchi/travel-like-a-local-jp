/* eslint-disable prettier/prettier */
import axios, { AxiosResponse, AxiosError } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Archive from "components/types/archive"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<{ month: string; count: number }[]>
) => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query GetAllPosts {
          posts {
            edges {
              node {
                date
              }
            }
          }
        }
      `
    }
  }

  // axiosでGraphQLのAPIコールの仕方(https://rapidapi.com/guides/graphql-axios)
  const data: { data: { posts: { edges: { node: { date: string } }[] } } } =
    await axios
      .request(options)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => {
        if (err.code === "ECONNABORTED") {
          console.log("axios API call failed")
        }
      })
  const dates: string[] | [] = data?.data?.posts?.edges.map(
    ({ node }) => node.date
  )

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
}

export default handler
