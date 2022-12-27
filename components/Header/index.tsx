import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "next/link"
import Image from "next/image"
import { Category } from "../types/category"

const Header: React.FC = () => {
  const matches = useMediaQuery("(min-width:768px)")
  const mockCategories: Category[] = [
    "activity",
    "food",
    "people",
    "hotel",
    "culture"
  ]
  return (
    <div className="mx-auto h-96 px-10 mb-8 bg-sp_hero sm:bg-pc_hero bg-no-repeat bg-cover bg-center sm:bg-fixed">
      <div className="flex justify-center md:justify-between w-full border-blue-400 py-8">
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
            {mockCategories.map((category) => (
              <Link key={category} href={`/category/${category}`}>
                <span className="text-white ml-4 font-semibold cursor-pointer">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
