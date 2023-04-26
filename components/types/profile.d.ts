/* eslint-disable prettier/prettier */
import Author from "./author"

type Profile = Author & {
  title: string
  content: string
}

export default Profile
