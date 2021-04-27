<template>
  <button class="tg-btn">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'Medium'
  }
})
</script>

<style lang="scss">
@import './../assets/styles';

.tg-btn {
  width: 100%;
  background: $color-primary;
  padding: $spacing-m;
  border-radius: 4px;
  border: none;
  color: $color-white;
  font-family: $font-family-sans-serif;
  font-weight: 600;
  font-size: $font-size-heading-h4-small;

  &:active {
    background: rgb(205 124 50);
  }
}
</style>
