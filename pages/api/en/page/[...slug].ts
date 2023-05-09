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
    query: { slug } // ex. query: { slug: [ 'sample-page', 'subpage' ] } というように配列で取得されるため
  } = req
  const arraySlug = slug as string[]
  const uri: string = arraySlug.join("/") // stringに直して
  const options = {
    method: "POST",
    url: API_URL,
    headers: { "Content-Type": "application/json" },
    data: {
      query: `#graphql 
        query singlePage($id: ID!){
          page(id: $id, idType: URI) {
            title
            content
          }
        }
        `,
      variables: {
        id: uri
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

// 参照(https://nextjs-ja-translation-docs.vercel.app/docs/api-routes/introduction)
// `pages/api/*`のファイルは全てAPIエンドポイントとして扱われ、「API Route」と呼ばれる
// API Routeを動作させるには↑のように、`res`と`req`を引数にもったハンドラメソッドを`export default`しないといけない
