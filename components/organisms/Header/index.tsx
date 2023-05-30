import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "next/link"
import Image from "next/image"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Key } from "swr"
import { useLanguage } from "components/hooks/useLanguage"
import { BLUR_DATA_URL } from "components/constants"
import Skeleton from "components/atoms/Skeleton"

const Header: React.FC = () => {
  const { isEnglish } = useLanguage()
  const matches = useMediaQuery("(min-width:768px)")
  const getCategoriesKey: Key = "/api/en/category"
  const { data: categoriesData } = useSWRWithTimeout<string[]>(getCategoriesKey)

  if (!categoriesData) {
    return <Skeleton width="100vw" height={56} />
  }

  return (
    <div className="flex justify-center items-center md:justify-between w-full border-blue-400 sticky top-0 z-10 bg-slate-100 h-14 p-3">
      <Link href={isEnglish ? "/en/" : "/ja/"}>
        <Image
          alt="logo"
          height={20}
          width={200}
          src="/rectangle-logo.png"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
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
                    : `/ja/category/${category}`
                }
              >
                <span className="ml-4 font-semibold cursor-pointer brand-navy to-brand-pink">
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
