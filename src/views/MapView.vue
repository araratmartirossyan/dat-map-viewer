<template>
  <div v-if="!claimStore.loading">
    <drawer>
      <claim
        :plate-no="claimStore.currentClaim?.plateNo"
        :image="claimStore.currentClaim?.image"
        :car="claimStore.currentClaim?.title"
        :address="claimStore.currentClaim?.address"
      />

      <template v-if="userStore.foundAgent">
        <heading tag="h3"> Expected arrival {{ duration }} </heading>
        <user-card
          :avatar="userStore.foundAgent.avatar"
          :last-name="userStore.foundAgent.lastName"
          :first-name="userStore.foundAgent.firstName"
          :position="userStore.foundAgent.coords"
          :id="userStore.foundAgent._id"
          status="busy"
        />
      </template>

      <template v-else>
        <heading tag="h3" v-if="userStore.hasNearest">
          Expected arrival {{ randomTime(10, 25) }} min
        </heading>
        <user-card
          v-for="({ avatar, lastName, firstName, _id }, index) in userStore
            .localFoundUsers?.nearest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="_id"
          :is-active="_id === currentAgent"
          @on-card-click="drawLocation"
          @on-assign-click="handleShowModal"
        />

        <heading tag="h3" v-if="userStore.hasFarest">
          Expected arrival {{ randomTime(25, 40) }} min
        </heading>
        <user-card
          v-for="({ avatar, lastName, firstName, _id }, index) in userStore
            .localFoundUsers?.farest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="_id"
          :is-active="_id === currentAgent"
          @on-card-click="drawLocation"
          @on-assign-click="handleShowModal"
        />
      </template>
    </drawer>
    <div id="ann"></div>
    <assign-agent-modal :show-modal="showModal" @on-submit="handleAssign" />
  </div>
  <div v-else></div>
</template>

<script setup lang="ts">
// Stores
import { useUserStore, useClaimStore } from '@/stores'

// Components
import UserCard from '@/components/UserCard.vue'
import Drawer from '@/components/Drawer.vue'
import Claim from '@/components/Claim.vue'
import AssignAgentModal from '@/components/modals/AssignAgent.modal.vue'

import { useRoute } from 'vue-router'
import { onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useDirection, useMap, useMarker } from './useMap.hook'

const { query } = useRoute()
const claimStore = useClaimStore()
const userStore = useUserStore()

// Constants
const center = { lat: 41.902782, lng: 12.496366 }

// Data
const showModal = ref(false)
const currentAgent = ref('')
const duration = ref('')
const distance = ref('')
const currentMapInstance = ref()
const currentLoaderInstance = ref()

// BL
onMounted(async () => {
  await claimStore.fetchClaim(query.claimId as string)
  await userStore.fetchPartners()
  userStore.init()

  const { mapInstance, loaderInstance } = await useMap(center, 'ann')

  currentMapInstance.value = mapInstance
  currentLoaderInstance.value = loaderInstance

  watchEffect(() => {
    userStore.usersWithLocation.forEach(user => {
      useMarker(user.coords, 'agent', mapInstance)
    })
  })

  if (claimStore.currentClaim) {
    useMarker(claimStore.currentClaim.location, 'claim', mapInstance)

    if (claimStore.currentClaim.status !== 'Draft') {
      showAssignedClaim(mapInstance, loaderInstance)
    }
  }
})

const showAssignedClaim = (
  mapInstance: google.maps.Map,
  loaderInstance: any
) => {
  watchEffect(async () => {
    const location = claimStore.currentClaim?.location
    const foundAgent = userStore.foundAgent
    // TO_DO Change center to USER LOCATION
    if (foundAgent?.coords && location && !duration.value) {
      const { info } = await useDirection(
        foundAgent.coords,
        location,
        mapInstance,
        loaderInstance
      )

      duration.value = info.duration.text
      distance.value = info.distance.text
    }
  })
}

const randomTime = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

// Assign Actions
const handleShowModal = (id: string) => {
  currentAgent.value = id
  showModal.value = true
}

const handleAssign = () => {
  showModal.value = !showModal.value
  userStore.setChosenAgent(currentAgent.value, query.claimId as string)
}

const drawLocation = async (choosenAgent: string) => {
  const findAgent = userStore.usersWithLocation.find(
    ({ _id }) => _id === choosenAgent
  )
  const location = claimStore.currentClaim?.location
  if (findAgent?.coords && location) {
    const { info } = await useDirection(
      findAgent?.coords,
      location,
      currentMapInstance.value,
      currentLoaderInstance.value
    )
  }

  currentAgent.value = choosenAgent
}
</script>

<style scoped>
.asside {
  width: 300px;
  background: #fff;
  height: 100vh;
  position: fixed;
  z-index: 1;
  padding: 20px;
}

ul,
li {
  list-style-type: none;
}

#ann {
  width: 100%;
  height: 100vh;
}
</style>
