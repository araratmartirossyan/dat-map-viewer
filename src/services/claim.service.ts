import axiosFn from './rest.service'

const SOCKET_URL = import.meta.env.VITE_SOCKET as string

const SERVICE_URL = `${SOCKET_URL}api/v1/claim`

type UpdateClaimInput = {
  claimId: string
  userId: string
}

export const assignClaim = async (data: UpdateClaimInput): Promise<any> => {
  await axiosFn({
    method: 'put',
    url: `${SERVICE_URL}/assign`,
    data
  })
}

export const fetchClaim = async (claimId: string): Promise<DAT.Claim> => {
  const claim = await axiosFn<DAT.Claim>({
    method: 'GET',
    url: `${SERVICE_URL}/claims/${claimId}`
  })
  return claim
}
