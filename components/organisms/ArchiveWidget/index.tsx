import { useSWRWithTimeout } from "components/hooks/swr"
import Archive from "components/types/archive"
import Link from "next/link"
import moment from "moment"
import { useLanguage } from "components/hooks/useLanguage"

const ArchiveWidget: React.FC = () => {
  const { isEnglish } = useLanguage()
  const {
    data: archives,
    error,
    isValidating
  } = useSWRWithTimeout<Archive[]>(
    isEnglish ? "/api/en/widget/archive" : "/api/ja/widget/archive"
  )

  if (!archives || isValidating || error) {
    return null
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Archives</h3>
      {archives?.map((archive) => {
        const publishedMonth: string = moment(
          archive.month + "-01",
          "YYYY-MM-DD"
        ).format("MMM YYYY")
        const [year, month] = archive.month.split("-")
        return (
          <Link
            href={
              isEnglish
                ? `/en/archive/${year}/${month}`
                : `/ja/archive/${year}/${month}`
            }
            key={archive.month}
            className="flex mb-4"
          >
            {publishedMonth}
          </Link>
        )
      })}
    </div>
  )
}

export default ArchiveWidget
