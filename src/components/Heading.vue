<template>
  <component :is="tag" class="tg-heading" :class="[tag, { bold }]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  tag: {
    type: String,
    default: 'h2'
  },
  bold: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.h2 {
  text-align: left;
  font-size: 28px;
  font-family: 'Nunito';
  font-weight: 600;
  margin: 0;
}

.h4,
h5 {
  font-size: 18px;
  font-family: 'Nunito';
  font-weight: 400;
  margin: 0 !important;
}

.bold {
  font-weight: 600;
  font-family: 'Nunito Bold';
}
</style>
