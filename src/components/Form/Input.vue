<template>
  <div class="tg-input">
    <input
      class="input"
      :placeholder="placeholder"
      :name="name"
      :value="modelValue"
      :type="type"
      @input="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'

const onInput = defineEmit(['update:modelValue'])

const handleUpdate = (e: any) => {
  const value = (e.target as HTMLInputElement).value
  onInput('update:modelValue', value)
}

defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles';
.tg-input {
  margin: 10px 0;
  .input {
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 10%);
    background-color: $main-bg;
    border: none;
    height: 46px;
    width: 100%;
    padding: 0 10%;
    font-family: 'Nunito';
    font-size: 1.1em;
  }
}
</style>
