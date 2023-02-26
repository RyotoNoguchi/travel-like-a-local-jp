/* eslint-disable prettier/prettier */
import axios, { AxiosError, AxiosResponse } from "axios"
import { GetPostsResponse } from "components/types/apiResponse"
import { Post } from "components/types/post"
import type { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const {
    query: { slug }
  } = req

  const queryCategoryOptions = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query GetCategoryBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `,
      variables: {
        slug
      }
    }
  }

  type GetCategoryBySlugResponse = {
    data: {
      post: {
        categories: {
          edges: {
            node: {
              name: string
            }
          }[]
        }
      }
    }
  }

  const categoryData: GetCategoryBySlugResponse = await axios
    .request(queryCategoryOptions)
    .then((res: AxiosResponse) => res.data)
    .catch((err: AxiosError) => {
      if (err.code === "ECONNABORTED") {
        console.log("axios API call failed")
      }
    })

  const category = categoryData?.data?.post?.categories?.edges.map(
    ({ node }) => node.name
  )[0]

  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query GetPostsExcludeBySlug($slug: ID!, $categoryName: String!) {
          posts(where: { excludeBySlug: $slug, categoryName: $categoryName }) {
            edges {
              node {
                author {
                  node {
                    name
                    avatar {
                      url
                    }
                  }
                }
                categories {
                  edges {
                    node {
                      name
                    }
                  }
                }
                date
                excerpt
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                slug
                title
              }
            }
          }
        }
        `,
      variables: {
        slug,
        categoryName: category
      }
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
  res.json(data?.data?.posts?.edges.map(({ node }) => node))
}

export default handler
