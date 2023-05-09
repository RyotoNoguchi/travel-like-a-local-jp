import Image from "next/image"
import { Key } from "swr"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Author } from "components/types"
import Link from "next/link"
import { useLanguage } from "components/hooks/useLanguage"

const AboutMe: React.FC = () => {
  const { isEnglish } = useLanguage()
  const authorProfileKey: Key = "/api/author/profile"
  const { data: profile, isValidating } =
    useSWRWithTimeout<Author>(authorProfileKey)

  if (!profile || isValidating) {
    return null
  }

  return (
    <Link href={isEnglish ? "/en/profile" : "/profile"}>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">About Me</h3>
        <div className="flex items-center mb-4 justify-center">
          <Image
            src={profile.avatar.url}
            alt="author-portrait"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div className="">
          <div className="flex justify-center">
            <span className="font-semibold">{profile.firstName}</span>
          </div>
          <div className="flex justify-center p-2">
            <span>{profile.description}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AboutMe
