import Image from "next/image"
import md5 from "md5"
import { useSWRWithTimeout } from "components/hooks/swr"
const GRAVATAR_API_URL = "https://www.gravatar.com/avatar"

const AboutMe: React.FC<{ email: string }> = ({ email }) => {
  const emailHash = md5(email.toLowerCase().trim())
  const { data: profileImageUrl } = useSWRWithTimeout<string>(
    `${GRAVATAR_API_URL}/${emailHash}`
  )
  if (!profileImageUrl) {
    return null
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">About Me</h3>
      <div className="flex items-center mb-4">
        <Image
          src={profileImageUrl}
          alt={profileImageUrl}
          width={80}
          height={80}
        />
      </div>
    </div>
  )
}

export default AboutMe
