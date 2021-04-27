import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

const BASE_API_URL = 'https://api-dat.myshelf.info'

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_API_URL
axiosInstance.defaults.method = 'POST'
axiosInstance.interceptors.response.use(
  (config) => config.data,
  (config) => Promise.reject(config.response.data)
)

const axiosFn = <T = void>(config: AxiosRequestConfig) => {
  const request: AxiosPromise<T> = axiosInstance({
    ...config
  })

  return (request as any) as Promise<T>
}

export default axiosFn
