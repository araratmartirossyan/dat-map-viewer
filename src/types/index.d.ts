declare namespace DAT {
  type Coords = {
    lat: number
    lng: number
  }

  type userInfo = {
    firstName: string
    lastName: string
    avatar: string
    coords: Coords
    currentDistance?: number
    id?: number
  }

  type Status = {
    [key: string]: number | string
  }

  type GenerateTokenRequest = {
    customerNumber: string
    user: string
    password: string
  }

  interface GenerateTokenResponse {
    token: string
  }

  type AuthForm = {
    customerNumber: string
    user: string
    password: string
  }

  type Claim = {
    plateNo: string
    vin: string
    car: string
    type: string
    location: Coords
    image: string
  }

  type PathFindResult = {
    nearest: DAT.userInfo[]
    farest: DAT.userInfo[]
  }
}
