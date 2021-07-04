<template>
  <div v-if="!claimStore.loading">
    <drawer>
      <claim
        :plate-no="claimStore.currentClaim?.plateNo"
        :image="claimStore.currentClaim?.image"
        :car="claimStore.currentClaim?.title"
      />

      <template v-if="userStore.foundAgent">
        <heading tag="h3"> Expected arrival {{ duration }} </heading>
        <user-card
          :avatar="userStore.foundAgent.avatar"
          :last-name="userStore.foundAgent.lastName"
          :first-name="userStore.foundAgent.firstName"
          :id="userStore.foundAgent._id"
          status="busy"
        />
      </template>

      <template v-else>
        <heading tag="h3" v-if="userStore.hasNearest">
          Expected arrival {{ randomTime(15, 20) }} min
        </heading>
        <user-card
          v-for="({ avatar, lastName, firstName, _id }, index) in userStore
            .localFoundUsers?.nearest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="_id"
          @on-card-click="handleShowModal"
        />

        <heading tag="h3" v-if="userStore.hasFarest">
          Expected arrival {{ randomTime(33, 40) }} min
        </heading>
        <user-card
          v-for="({ avatar, lastName, firstName, _id }, index) in userStore
            .localFoundUsers?.farest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="_id"
          @on-card-click="handleShowModal"
        />
      </template>
    </drawer>
    <div id="ann"></div>
    <!-- <google-map
      :api-key="API_KEY"
      style="width: 100%; height: 100vh"
      :center="center"
      :zoom="13"
      ref="currentMap"
      id="map"
    >
      <Marker
        v-if="claimStore.currentClaim"
        :options="{
          icon: 'https://svgshare.com/i/WdB.svg',
          position: {
            lat: claimStore.currentClaim?.location.lat,
            lng: claimStore.currentClaim?.location.long
          }
        }"
      />
      <Marker
        v-for="({ coords: { lat, long } }, key) in userStore.usersWithLocation"
        :key="`coord-${String(key)}`"
        :options="{
          position: {
            lat,
            lng: long
          }
        }"
      />
    </google-map> -->
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
import { computed, onMounted, ref, watch, watchEffect } from '@vue/runtime-core'
import { useDirection, useMap } from './useMap.hook'

const { query } = useRoute()
const claimStore = useClaimStore()
const userStore = useUserStore()

// Constants
const center = { lat: 51.726967601002414, long: 5.29334700255126 }

// Data
const showModal = ref(false)
const currentAgent = ref('')
const duration = ref('')
const distance = ref('')

// BL
onMounted(async () => {
  await userStore.fetchUsers()
  await claimStore.fetchClaim(query.claimId as string)
  userStore.init()

  const { mapInstance, loaderInstance } = await useMap(center, 'ann')

  if (claimStore.currentClaim) {
    watchEffect(async () => {
      const location = claimStore.currentClaim?.location
      const foundAgent = userStore.foundAgent
      // TO_DO Change center to USER LOCATION
      if (foundAgent?.coords && location) {
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
})

const handleShowModal = (id: string) => {
  currentAgent.value = id
  showModal.value = true
}

const handleAssign = () => {
  showModal.value = !showModal.value
  userStore.setChosenAgent(currentAgent.value, query.claimId as string)
}

const randomTime = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
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
