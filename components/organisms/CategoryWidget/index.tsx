import { useSWRWithTimeout } from "components/hooks/swr"
import { useLanguage } from "components/hooks/useLanguage"
import Link from "next/link"

const CategoryWidget: React.FC = () => {
  const { isEnglish } = useLanguage()
  const { data: categories } = useSWRWithTimeout<string[]>("/api/en/category")

  if (!categories) {
    return null
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories?.map((category) => (
        <Link
          href={
            isEnglish ? `/en/category/${category}` : `/ja/category/${category}`
          }
          key={category}
        >
          <span className="cursor-pointer block pb-3 mb-3">{category}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoryWidget
