<template>
  <div>
    <drawer>
      <claim
        :plate-no="currentClaim?.plateNo"
        :image="currentClaim?.image"
        :car="currentClaim?.car"
      />
      <template v-if="userStore.foundAgent">
        <heading tag="h3">Agent on the way</heading>
        <user-card
          :avatar="userStore.foundAgent.avatar"
          :last-name="userStore.foundAgent.lastName"
          :first-name="userStore.foundAgent.firstName"
          :id="userStore.foundAgent.id"
          status="busy"
        />
      </template>

      <template v-else>
        <heading tag="h3"
          >Expected arrival {{ randomTime(15, 20) }} min</heading
        >
        <user-card
          v-for="({ avatar, lastName, firstName, id }, index) in userStore
            .localFoundUsers?.nearest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="id"
          @on-card-click="handleShowModal"
        />

        <heading tag="h3"
          >Expected arrival {{ randomTime(33, 40) }} min
        </heading>
        <user-card
          v-for="({ avatar, lastName, firstName, id }, index) in userStore
            .localFoundUsers?.farest"
          :key="index"
          :avatar="avatar"
          :last-name="lastName"
          :first-name="firstName"
          :id="id"
          @on-card-click="handleShowModal"
        />
      </template>
    </drawer>
    <google-map
      :api-key="API_KEY"
      style="width: 100%; height: 100vh"
      :center="center"
      :zoom="13"
    >
      <Marker
        :options="{
          icon: 'https://svgshare.com/i/WdB.svg',
          position: {
            lat: currentClaim?.location.lat,
            lng: currentClaim?.location.lng
          }
        }"
      />

      <Marker
        v-for="({ coords: { lat, lng } }, key) in userStore.users"
        :key="`coord-${key}`"
        :options="{
          position: {
            lat,
            lng
          }
        }"
      />
    </google-map>
    <assign-agent-modal :show-modal="showModal" @on-submit="handleAssign" />
  </div>
</template>

<script setup lang="ts">
// Libs
import { GoogleMap, Marker } from 'vue3-google-map'

// Stores
import { useUserStore } from '@/stores/users.store'

// Mocks
import { claimsMock } from '@/mocks/claims.mock'

// Components
import UserCard from '@/components/UserCard.vue'
import Drawer from '@/components/Drawer.vue'
import Claim from '@/components/Claim.vue'
import AssignAgentModal from '@/components/modals/AssignAgent.modal.vue'

import { useRoute } from 'vue-router'

const { query } = useRoute()
const userStore = useUserStore()

// Constants
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const center = { lat: 51.726967601002414, lng: 5.29334700255126 }

// Data
ref: showModal = false
ref: currentAgent = 0

// BL
const currentClaim = claimsMock.find(
  (claim) => claim.plateNo === query.plateNo
) as DAT.Claim

userStore.fetchUsers(currentClaim)

const handleShowModal = (id: number) => {
  currentAgent = id
  showModal = true
}

const handleAssign = () => {
  showModal = !showModal
  userStore.setChosenAgent(currentAgent)
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
</style>
