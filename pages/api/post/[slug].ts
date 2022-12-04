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
  const {
    query: { slug }
  } = req
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query SinglePost($id: ID!){
          post(id: $id, idType: SLUG) {
            title
            content
          }
        }
        `,
      variables: {
        id: slug
      }
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
