import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

// Utils
import { findNearestLocation } from '@/utils/pathFind.util'
import { usersMock } from '@/mocks/users.mock'

const SOCKET_URL = import.meta.env.VITE_SOCKET as string

type UserStore = {
  instance: any
  users: DAT.userInfo[]
  foundUsers?: DAT.PathFindResult | null
  chosenAgentId: number
}

type FoundUsersGetters = {
  foundUsers?: DAT.PathFindResult
  chosenAgentId?: number
  users: DAT.userInfo[]
}

export const useUserStore = defineStore({
  id: 'users',
  state: () =>
    <UserStore>{
      instance: io(SOCKET_URL),
      users: usersMock,
      foundUsers: null,
      chosenAgentId: 0
    },
  getters: {
    localFoundUsers: ({ foundUsers }: FoundUsersGetters) => foundUsers,
    foundAgent: ({ chosenAgentId, users }: FoundUsersGetters) =>
      users.find(({ id }) => id === chosenAgentId)
  },
  actions: {
    init() {
      this.instance.on('details', (data: any) => {
        if (data) {
          this.users.push({
            firstName: data.firsName,
            lastName: data.lastName,
            avatar: data.avatar,
            coords: {
              lat: data.position.lat,
              lng: data.position.lng
            }
          })
        }
      })
    },
    fetchUsers(currentClaim: DAT.Claim) {
      this.foundUsers = findNearestLocation(this.users, currentClaim?.location)
    },
    setChosenAgent(id: number) {
      this.chosenAgentId = id
    }
  }
})
