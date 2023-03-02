import Avatar from "components/types/avatar"

type Author = {
  node: {
    avatar: Avatar
    // eslint-disable-next-line prettier/prettier
    description: string
    name: string
  }
}

export default Author
