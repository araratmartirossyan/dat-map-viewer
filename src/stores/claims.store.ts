import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'

// service
import { fetchClaim } from '@/services/claim.service'
import { useUserStore } from './users.store'
import { ClaimStatus } from '@/types/enums'

type ClaimStore = {
  currentClaim: DAT.Claim | null
  loading: boolean
}

export const useClaimStore = defineStore({
  id: 'claims',
  state: () =>
    <ClaimStore>{
      currentClaim: {},
      loading: true
    },
  actions: {
    async fetchClaim(claimId: string) {
      const loading = ElLoading.service()
      const claim = await fetchClaim(claimId)
      if (claim[0]) {
        this.currentClaim = claim[0]

        if (this.currentClaim.status === ClaimStatus.Assigned) {
          useUserStore().$patch({
            chosenAgentId: this.currentClaim.agent?._id,
            users: [this.currentClaim.agent]
          })
        }
      }

      loading.close()
      this.loading = false
    }
  }
})
