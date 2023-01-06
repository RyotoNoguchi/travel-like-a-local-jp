/* eslint-disable prettier/prettier */
import axios, { AxiosResponse, AxiosError } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { PostDataResponse } from "../../../components/organisms/FeaturedPost"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

// type GetFeaturedPostResponse = {
//   excerpt: string
//   slug: string
//   title: string
// }

// type Data = {
//   getFeaturedPostResponse: { excerpt: string; slug: string; title: string }
// }

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<PostDataResponse>
) => {
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query GetFeaturedPost {
          posts(where: {tag: "featured"}) {
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
                    uri
                  }
                }
                author {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      `
    }
  }

  // axiosでGraphQLのAPIコールの仕方(https://rapidapi.com/guides/graphql-axios)
  const data: PostDataResponse = await axios
    .request(options)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      if (err.code === "ECONNABORTED") {
        console.log("axios API call failed")
      }
    })
  console.log("data", data)
  res.json(data)
}

export default handler
