import Image from "next/image"
import { Key } from "swr"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Author } from "components/types"

const Profile: React.FC = () => {
  const authorProfileKey: Key = "/api/author/profile"
  const { data: profile, isValidating } =
    useSWRWithTimeout<Author>(authorProfileKey)

  if (!profile || isValidating) {
    return null
  }

  return (
    <>
      <h1>ABOUT ME</h1>
      <Image
        src={profile.avatar.url}
        alt="author-portrait"
        width={120}
        height={120}
        className="rounded-full"
      />
    </>
  )
}

export default Profile
