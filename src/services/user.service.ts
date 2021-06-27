import axiosFn from './rest.service'

const SOCKET_URL = import.meta.env.VITE_SOCKET as string

const SERVICE_URL = `${SOCKET_URL}api/v1/user`

export const getUsers = async () => {
  const users = await axiosFn<DAT.userInfo[]>({
    method: 'GET',
    url: SERVICE_URL
  })

  return users
}
