import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

// Utils
import { findNearestLocation } from '@/utils/pathFind.util'
import { useClaimStore } from './claims.store'
import { getUsers, getPartners } from '@/services/user.service'
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
  partners: DAT.PartnerInfo[]
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
      chosenAgentId: null,
      partners: []
    },
  getters: {
    usersWithLocation: ({ users }) => users?.filter(user => !!user.coords.lat),
    localFoundUsers: ({ usersWithLocation = [] }) => {
      const claimStore = useClaimStore()
      if (claimStore.currentClaim) {
        return findNearestLocation(
          usersWithLocation,
          claimStore.currentClaim?.location
        )
      }
    },
    foundAgent: ({ chosenAgentId, users }) =>
      users.find(({ _id }) => _id === chosenAgentId),

    hasFarest: ({ localFoundUsers }) =>
      localFoundUsers && localFoundUsers?.farest?.length > 0,
    hasNearest: ({ localFoundUsers }) =>
      localFoundUsers && localFoundUsers?.nearest?.length > 0
  },
  actions: {
    init() {
      this.instance.on('details', (data: TrackSocketResponse) => {
        if (data) {
          const users = this.users.map(user => {
            if (user._id === data._id) {
              return {
                ...user,
                coords: {
                  lat: data.position.lat,
                  lng: data.position.lng
                }
              }
            }

            return user
          })

          this.users = [...users]
        }
      })
    },
    async fetchPartners() {
      const partners = await getPartners()
      this.users = partners.map(({ name, identification, coords }) => ({
        firstName: name,
        lastName: name,
        currentDistance: 0,
        _id: identification,
        coords
      }))

      // firstName: string
      // lastName: string
      // avatar: Avatar
      // coords: Coords
      // currentDistance?: number
      // id?: number
      // _id?: string

      //   active: 'true',
      // city: 'ROMA',
      // country: 'IT',
      // customerNumber: '3132783',
      // identification: '00004',
      // name: 'PERITO FIDUCIARIO',
      // partnerId: '31603',
      // partnerKind: 'inferior',
      // role: 'EXPERT',
      // street: 'Via dei corazzieri',
      // streetNr: '10',
      // zip: '00144'
    },
    async fetchUsers() {
      this.users = await getUsers()
    },
    async setChosenAgent(userId: string, claimId: string) {
      await assignClaim({ userId, claimId })
    }
  }
})
