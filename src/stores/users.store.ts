import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

// Utils
import { findNearestLocation } from '@/utils/pathFind.util'
import { useClaimStore } from './claims.store'
import { getUsers } from '@/services/user.service'
import { assignClaim } from '@/services/claim.service'

const SOCKET_URL = import.meta.env.VITE_SOCKET as string

type SortedUsers = {
  nearest: DAT.userInfo[]
  farest: DAT.userInfo[]
}

type UserStore = {
  instance: Socket
  users: DAT.userInfo[]
  foundUsers?: DAT.PathFindResult | null
  chosenAgentId: string | null
  usersWithLocation?: DAT.userInfo[]
  localFoundUsers?: SortedUsers
}

interface TrackSocketResponse extends DAT.userInfo {
  position: DAT.Coords
}

export const useUserStore = defineStore({
  id: 'users',
  state: () =>
    <UserStore>{
      instance: io(SOCKET_URL),
      users: [],
      foundUsers: null,
      chosenAgentId: null
    },
  getters: {
    usersWithLocation: ({ users }) => users?.filter((user) => !!user.coords),
    localFoundUsers: ({ usersWithLocation = [] }) => {
      const claimStore = useClaimStore()
      return findNearestLocation(
        usersWithLocation,
        claimStore.currentClaim?.location
      )
    },
    foundAgent: ({ chosenAgentId, users }) => {
      console.log(chosenAgentId, users)
      return users.find(({ _id }) => _id === chosenAgentId)
    },

    hasFarest: ({ localFoundUsers }) =>
      localFoundUsers && localFoundUsers?.farest?.length > 0,
    hasNearest: ({ localFoundUsers }) =>
      localFoundUsers && localFoundUsers?.nearest?.length > 0
  },
  actions: {
    init() {
      this.instance.on('details', (data: TrackSocketResponse) => {
        if (data) {
          const users = this.users.map((user) => {
            if (user._id === data._id) {
              return {
                ...user,
                coords: {
                  lat: data.position.lat,
                  long: data.position.long
                }
              }
            }

            return user
          })

          this.users = [...users]
        }
      })
    },
    async fetchUsers() {
      this.users = await getUsers()
    },
    async setChosenAgent(userId: string, claimId: string) {
      await assignClaim({ userId, claimId })
    }
  }
})
