import axios, { AxiosResponse, AxiosError } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { GetCategoriesResponse } from "../../../components/types/apiResponse"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<GetCategoriesResponse>
) => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query GetCategories {
          categories {
            edges {
              node {
                name
              }
            }
          }
        }
      `
    }
  }
  // axiosでGraphQLのAPIコールの仕方(https://rapidapi.com/guides/graphql-axios)
  const data: GetCategoriesResponse = await axios
    .request(options)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      if (err.code === "ECONNABORTED") {
        console.log("axios API call failed")
      }
    })
  res.json(data)
}

export default handler
