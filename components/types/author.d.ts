import Avatar from "components/types/avatar"

type Author = {
  avatar: Avatar
  // eslint-disable-next-line prettier/prettier
  description: string
  name: string
  firstName?: string
  lastName?: string
}

export default Author
