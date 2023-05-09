import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "next/link"
import Image from "next/image"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Key } from "swr"
import { useLanguage } from "components/hooks/useLanguage"

const Header: React.FC = () => {
  const { isEnglish } = useLanguage()
  const matches = useMediaQuery("(min-width:768px)")
  const getCategoriesKey: Key = "/api/category"
  const { data: categoriesData } = useSWRWithTimeout<string[]>(getCategoriesKey)

  if (!categoriesData) {
    return null
  }

  return (
    <div className="flex justify-center items-center md:justify-between w-full border-blue-400 sticky top-0 z-10 bg-slate-100 text-cyan-500 h-14 p-3">
      <Link href={isEnglish ? "/en/" : "/"}>
        <Image alt="logo" height={20} width={200} src="/rectangle-logo.png" />
      </Link>
      {matches && (
        <div className="flex items-center">
          {categoriesData?.map((category) => {
            return (
              <Link
                key={category}
                href={
                  isEnglish
                    ? `/en/category/${category}`
                    : `/category/${category}`
                }
              >
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
