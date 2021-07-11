declare namespace DAT {
  type Coords = {
    lat: number
    lng: number
  }

  type PartnerInfo = {
    active: string
    city: string
    country: string
    customerNumber: string
    identification: string
    name: string
    partnerId: string
    partnerKind: string
    role: string
    street: string
    streetNr: string
    zip: string
    coords: Coords
  }

  type userInfo = {
    firstName: string
    lastName: string
    avatar?: Avatar
    coords: Coords
    partnerId: string
    currentDistance?: number
    id?: number
    _id?: string
  }

  type Status = {
    [key: string]: number | string
  }

  type GenerateTokenRequest = {
    customerNumber: string
    user: string
    password: string
  }

  type Avatar = {
    ext: string
    mime: string
    name: string
    url: string
    _id: string
  }

  interface GenerateTokenResponse {
    token: string
  }

  type AuthForm = {
    customerNumber: string
    user: string
    password: string
  }

  enum ClaimStatus {
    Draft = 'Draft',
    Assigned = 'Assigned',
    Finished = 'Finished'
  }

  type Claim = {
    title: string
    address: string
    claimId: string
    description: string
    plateNo: string
    status: ClaimStatus
    agent?: DAT.userInfo
    location: Coords
    vin: string
    expert?: string
    image: string
  }

  type PathFindResult = {
    nearest: DAT.userInfo[]
    farest: DAT.userInfo[]
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

type ComponentSize = any

type SFCWithInstall = any

declare module 'vue3-google-map'
