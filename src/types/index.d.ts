declare namespace DAT {
  type Coords = {
    lat: number
    long: number
  }

  type userInfo = {
    firstName: string
    lastName: string
    avatar: Avatar
    coords: Coords
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
    claimId: string
    description: string
    plateNo: string
    status: ClaimStatus
    agent?: DAT.userInfo
    location: Coords
    vin: string
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
