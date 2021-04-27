<template>
  <div class="claim">
    <div class="claim-image">
      <el-image :src="image" class="claim__image" />
      <div class="claim__info">
        <heading> {{ plateNo }}</heading>
        <heading tag="span"> {{ car }} </heading>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineAsyncComponent } from '@vue/runtime-core'

const Heading = defineAsyncComponent(() => import('@/components/Heading.vue'))

defineProps({
  plateNo: {
    type: String,
    default: ''
  },
  vin: {
    type: String,
    default: ''
  },
  car: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  location: {
    type: Object,
    default: () => {}
  },
  image: {
    type: String,
    default: ''
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
