import { Key } from "swr"
import { useSWRWithTimeout } from "components/hooks/swr"
import { Profile as ProfileType } from "components/types"

const Profile: React.FC = () => {
  const profileKey: Key = "/api/profile"
  const { data: profile, isValidating } =
    useSWRWithTimeout<ProfileType>(profileKey)

  if (!profile || isValidating) {
    return null
  }

  return (
    <>
      <h1 className="text-center md:text-left mb-0 md:mb-8">{profile.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: profile.content }}></div>
    </>
  )
}

export default Profile
