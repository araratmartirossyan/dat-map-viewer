<template>
  <div class="claim">
    <div class="claim-image">
      <el-image v-if="image" :src="image" class="claim__image" />
      <el-image v-else :src="defaultCarImage" class="claim__image aa" />
      <div class="claim__info">
        <heading> {{ plateNo }}</heading>
        <heading tag="span"> {{ car }} </heading>
        <heading tag="span"> {{ address }} </heading>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineAsyncComponent } from '@vue/runtime-core'
import defaultCarImage from '@/assets/download.png'
const Heading = defineAsyncComponent(() => import('@/components/Heading.vue'))

defineProps({
  plateNo: {
    type: String,
    default: ''
  },
  car: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: null
  }
})
</script>

<style lang="scss">
.claim {
  margin-bottom: 10px;

  &__image {
    width: 100%;
    border-radius: 24px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
