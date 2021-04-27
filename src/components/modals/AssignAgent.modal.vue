<template>
  <el-dialog title="Warning" v-model="showModal" width="30%" center>
    <span>Assign this agent for this claim?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showModal = false">Cancel</el-button>
        <el-button type="primary" @click="$emit('on-submit')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from '@vue/runtime-core'

defineEmit(['on-submit'])

defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})
</script>
