/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const TopPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/en")
  }, [])

  return <div>Redirecting...</div>
}

export default TopPage
