import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

const BASE_API_URL = 'https://api-dat.myshelf.info'

const axiosInstance = axios.create()

enum ResponseErrors {
  AuthFailed = 'Server.authorizationFailed'
}

const readRouteParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return {
    claimId: urlSearchParams.get('claimId')
  }
}

axiosInstance.defaults.baseURL = BASE_API_URL
axiosInstance.defaults.method = 'POST'
axiosInstance.interceptors.response.use(
  config => config.data,
  config => {
    const is403 = config.response.status === 403

    const isAuthFailed =
      config.response.data.faultstring === ResponseErrors.AuthFailed

    if (is403 || isAuthFailed) {
      const { claimId } = readRouteParams()
      location.href = `/login?claimId=${claimId}`
    }

    return Promise.reject(config.response.data)
  }
)

axiosInstance.defaults.headers.Authorization = localStorage.getItem('token')

const axiosFn = <T = void>(config: AxiosRequestConfig) => {
  const request: AxiosPromise<T> = axiosInstance({
    ...config
  })

  return (request as any) as Promise<T>
}

export default axiosFn
