import { useRouter } from "next/router"

export const useLanguage = () => {
  const router = useRouter()
  const isEnglish = router.asPath.startsWith("/en")
  const API_BASE_PATH = isEnglish ? "/api/en" : "/api/ja"
  return { isEnglish, API_BASE_PATH }
}
