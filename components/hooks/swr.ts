import axios, { AxiosResponse, AxiosError } from "axios"
import useSWR, { Key, Fetcher, SWRResponse } from "swr"

type Config = {
  timeout: number
}

export function useSWRWithTimeout<T>(key: Key): SWRResponse<T> {
  const fetcher: Fetcher<T, string> = (apiPath) =>
    axios
      .get<T, AxiosResponse<T, AxiosError>, Config>(apiPath, { timeout: 10000 })
      .then((res) => res.data)

  return useSWR<T, Error>(key, fetcher, { shouldRetryOnError: false })
}

// 参考:
// - https://swr.vercel.app/ja/docs/with-nextjs
// - https://swr.vercel.app/ja/docs/arguments
export function useSWRDynamicParams<T>(
  url: string,
  slug: string
): SWRResponse<T> {
  const fetcher: Fetcher<T, string[]> = (url: string, slug: string) =>
    axios.get(`${url}/${slug}`, { timeout: 10000 }).then((res) => res.data)

  return useSWR<T, Error>([url, slug], ([url, slug]: [string, string]) =>
    fetcher(url, slug)
  )
}
