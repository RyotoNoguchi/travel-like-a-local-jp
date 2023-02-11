/* eslint-disable prettier/prettier */
import axios, { AxiosResponse, AxiosError } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { GetPostsResponse } from "components/types/apiResponse"
import { Post } from "components/types/post"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (_: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query GetRecentPostForWidget {
          posts(where: {orderby: {field: DATE, order: DESC}}, first: 3) {
            edges {
              node {
                date
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                slug
                title
              }
            }
          }
        }
      `
    }
  }

  // axiosでGraphQLのAPIコールの仕方(https://rapidapi.com/guides/graphql-axios)
  const data: GetPostsResponse = await axios
    .request(options)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      if (err.code === "ECONNABORTED") {
        console.log("axios API call failed")
      }
    })
  console.log("GetRecentPostForWidgetResponse: ", data)
  res.json(data?.data?.posts?.edges.map(({ node }) => node))
}

export default handler
