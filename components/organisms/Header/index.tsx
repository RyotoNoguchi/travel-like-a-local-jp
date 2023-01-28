import useMediaQuery from "@mui/material/useMediaQuery"
import Link from "next/link"
import Image from "next/image"
import Category from "../../types/category"

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
          {mockCategories.map((category) => (
            <Link key={category} href={`/category/${category}`}>
              <span className=" ml-4 font-semibold cursor-pointer">
                {category}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
