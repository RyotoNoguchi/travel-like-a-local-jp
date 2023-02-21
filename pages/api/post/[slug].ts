/* eslint-disable prettier/prettier */
// import axios, { AxiosResponse, AxiosError } from "axios"
import axios, { AxiosError, AxiosResponse } from "axios"
import {
  GetPostsResponse
  // GraphqlGetPopularPostsResponse
} from "components/types/apiResponse"
import { Post } from "components/types/post"
// import request, { gql } from "graphql-request"
import type { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const {
    query: { slug }
  } = req

  // const queryGetRelatedPosts = gql`
  //   query GetRelatedPosts($slug: ID!, $categoryName: String) {
  //     posts(where: { excludeBySlug: $slug, categoryName: $categoryName }) {
  //       edges {
  //         node {
  //           author {
  //             node {
  //               name
  //               avatar {
  //                 url
  //               }
  //             }
  //           }
  //           categories {
  //             edges {
  //               node {
  //                 name
  //               }
  //             }
  //           }
  //           date
  //           excerpt
  //           featuredImage {
  //             node {
  //               altText
  //               sourceUrl
  //             }
  //           }
  //           slug
  //           title
  //         }
  //       }
  //     }
  //   }
  // `

  // const queryGetRelatedPostsResponse: GraphqlGetPopularPostsResponse =
  //   await request(API_URL, queryGetRelatedPosts, { slug })

  // const relatedPosts: Post[] = queryGetRelatedPostsResponse?.posts?.edges.map(
  //   ({ node }) => node
  // )

  // console.log("relatedPosts", relatedPosts)

  // return relatedPosts

  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql
        query GetPostsExcludeBySlug($slug: ID) {
          posts(where: { excludeBySlug: $slug }) {
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
        slug
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
