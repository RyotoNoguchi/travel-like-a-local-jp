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

// export function useSWRWithMultipleArguments<T>(
//   array: string[]
// ): SWRResponse<T> {
//   const apiEndpoint = `${key}/${slug}`
//   const fetcher: Fetcher<T, string> = (apiEndpoint) =>
//     axios
//       .get<T, AxiosResponse<T, AxiosError>, Config>(apiEndpoint)
//       .then((res) => res.data)

//   return useSWR<T, Error>(apiEndpoint, fetcher)
// }
