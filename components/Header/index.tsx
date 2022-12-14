import useMediaQuery from "@mui/material/useMediaQuery"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { Category } from "../types/category"

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-bottom-width: 1px;
  width: 100%;
`

const Header: React.FC = () => {
  const matches = useMediaQuery("(min-width:768px)")
  const mockCategories: Category[] = [
    "activity",
    "food",
    "people",
    "hotel",
    "culture"
  ]
  return (
    <Container>
      <HeaderWrapper>
        {matches ? (
          <Link href="/">
            <Image
              alt="logo"
              height={30}
              width={300}
              src="/logo_lg.png"
            ></Image>
          </Link>
        ) : (
          <Link href="/">
            <Image alt="logo" height={100} width={400} src="/logo.png"></Image>
          </Link>
        )}
        {matches && (
          <div>
            {mockCategories.map((category) => (
              <Link key={category} href={`/category/${category}`}>
                {category}
              </Link>
            ))}
          </div>
        )}
      </HeaderWrapper>
    </Container>
  )
}

export default Header
