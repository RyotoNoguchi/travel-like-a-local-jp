import Author from "components/types/author"
import Image from "next/image"
const Author: React.FC<{ author: Author }> = ({ author }) => {
  return (
    <Image
      alt={author.node.name}
      src={author.node.avatar.url}
      width={80}
      height={80}
      className="rounded-full"
    />
  )
}

export default Author
