/* eslint-disable prettier/prettier */
import Head from "next/head"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { SWRConfig, unstable_serialize } from "swr"
import { API_BASE_URL } from "components/constants"
import { CategoryWidget, PostWidget, ArchiveWidget, AboutMe } from "components"

// type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryPage: React.FC = () => {
  const router = useRouter()
  const slug = (router.query.slug as string) ?? ("default" as string)

  return (
    <>
      <Head>
        <title>Category page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:m-24 md:m-8">
          <div className="md:col-span-8 col-span-1">
            {/* // TODO <ArchivedPostCards>同様に、<PostCard>を子コンポーネントに持つ<CategoryPostCards>を作成 */}
          </div>
          <div className="md:col-span-4 col-span-1 relative">
            <div className="sticky top-8 mb-8">
              <AboutMe />
              <PostWidget />
              <ArchiveWidget />
              <CategoryWidget />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CategoryPage
