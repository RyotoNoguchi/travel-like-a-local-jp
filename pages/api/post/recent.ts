/* eslint-disable prettier/prettier */
import axios, { AxiosResponse, AxiosError } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

type PageContent = {
  title: string
  content: string
}

type Data = {
  page: PageContent
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query RecentPosts {
              posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                  node {
                    slug
                    title
                    excerpt
                  }
                }
              }
            }
        `,
    }
  }

  // axiosでGraphQLのAPIコールの仕方(https://rapidapi.com/guides/graphql-axios)
  const data: Data = await axios
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
