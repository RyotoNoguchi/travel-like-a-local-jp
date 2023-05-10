/* eslint-disable prettier/prettier */
import Category from "components/types/category"
import { Post } from "components/types/post"
import { GraphQLError } from "graphql"
import request, { gql } from "graphql-request"
import type { NextApiRequest, NextApiResponse } from "next"
const GRAPHQL_API_URL = process.env.WORDPRESS_API_URL ?? ""

const handler = async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const {
    query: { slug }
  } = req

  try {
    // slugを条件に該当Postに紐づくカテゴリを１つだけ取得
    const queryGetCategoryBySlug = gql`
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
    `
    const { post } = await request<{
      post: { categories: { edges: Category[] } }
    }>(GRAPHQL_API_URL, queryGetCategoryBySlug, { slug: slug })

    const category = post?.categories?.edges.map(({ node }) => node.name)[0]

    // queryGetCategoryBySlugで取得したカテゴリを条件にして該当のslug以外で同じカテゴリのPostsを取得
    const queryGetPostsExcludeBySlug = gql`
      query GetPostsExcludeBySlug($slug: ID!, $categoryName: String!) {
        posts(
          where: {
            excludeBySlug: $slug
            categoryName: $categoryName
            tag: "JP"
          }
        ) {
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
    `
    const { posts } = await request<{
      posts: { edges: { node: Post }[] }
    }>(GRAPHQL_API_URL, queryGetPostsExcludeBySlug, {
      slug: slug,
      categoryName: category
    })
    res.json(posts?.edges?.map(({ node }) => node))
  } catch (error: unknown) {
    const graphQLError = error as GraphQLError
    console.log(graphQLError.message)
  }
}

export default handler
