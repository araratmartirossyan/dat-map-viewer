// Find average
// Find top 3 smallest number

import { distance } from './findLocation.util'
import { groupBy } from 'ramda'

type PathFindResult = {
  nearest: DAT.userInfo[]
  farest: DAT.userInfo[]
}

export const findNearestLocation = (
  users: DAT.userInfo[],
  claimLocation: DAT.Coords
): PathFindResult => {
  const signedUsers = users.map(user => {
    if (user.coords) {
      const { lat, lng } = user.coords
      const res = distance(lat, lng, claimLocation.lat, claimLocation.lng)

      return {
        ...user,
        currentDistance: res
      }
    }

    return user
  })
  return findTop(signedUsers)
}

const findAverage = (users: DAT.userInfo[]) => {
  const total = users.reduce((acc, c) => {
    if (c.currentDistance) {
      return acc + c.currentDistance
    }
    return acc
  }, 0)
  return total / users.length
}

const findTop = (users: DAT.userInfo[]) => {
  const average = findAverage(users)

  const grouped = groupBy((user: DAT.userInfo) => {
    const distance = user.currentDistance
    if (distance) {
      return distance < average ? 'nearest' : 'farest'
    }
    return ''
  })
  const res = grouped(users)

  return res
}
