import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "next/link"
import Image from "next/image"
import { useSWRWithTimeout } from "../../hooks/swr"
import { Key } from "swr"
import { GetCategoriesResponse } from "../../types/apiResponse"

const Header: React.FC = () => {
  const matches = useMediaQuery("(min-width:768px)")
  const getCategoriesKey: Key = "api/post/category"
  const { data: categoriesData } =
    useSWRWithTimeout<GetCategoriesResponse>(getCategoriesKey)

  return (
    <div className="flex justify-center md:justify-between w-full border-blue-400 sticky top-0 z-10 bg-slate-100 text-cyan-500">
      {matches ? (
        <Link href="/">
          <Image alt="logo" height={30} width={200} src="/logo.png"></Image>
        </Link>
      ) : (
        <Link href="/">
          <Image alt="logo" height={30} width={200} src="/logo.png"></Image>
        </Link>
      )}
      {matches && (
        <div className="flex items-center">
          {categoriesData?.data?.categories.edges.map(({ node }) => {
            const category = node.name
            return (
              <Link key={category} href={`category/${category}`}>
                <span className=" ml-4 font-semibold cursor-pointer">
                  {category}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Header
