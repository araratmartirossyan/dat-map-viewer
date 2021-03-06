<template>
  <div
    class="user-card"
    :class="{ active: isActive }"
    @click="$emit('on-card-click', id)"
  >
    <div class="user-card__image">
      <el-avatar
        v-if="!avatar"
        shape="square"
        :size="40"
        fit="cover"
        :src="DefaultAvatar"
        alt="game-image"
      />
      <el-avatar
        v-else
        shape="square"
        :size="60"
        :src="`${SOCKET_URL}${avatar.url}`"
        alt="empty picture image"
      />
    </div>
    <div class="user-card__description">
      <heading tag="h5">{{ firstName }} {{ lastName }}</heading>
      <div class="info">
        <el-tag :type="statusTypes[status]">{{ status }}</el-tag>
        <el-tag v-if="!position.lat" type="danger">Offline</el-tag>
        <el-tag v-else type="success">Online</el-tag>
        <el-button v-if="isActive" @click="$emit('on-assign-click', id)">
          Assign
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineAsyncComponent } from 'vue'
import DefaultAvatar from '@/assets/avatar.png'

// Components
const Heading = defineAsyncComponent(() => import('@/components/Heading.vue'))

defineProps({
  id: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'free'
  },
  avatar: {
    type: Object,
    default: ''
  },
  position: {
    type: Object,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const statusTypes: DAT.Status = {
  free: 'success',
  busy: 'warning'
}

const SOCKET_URL = import.meta.env.VITE_SOCKET as string
</script>

<style lang="scss">
@import '@/assets/styles';

.user-card {
  align-items: flex-start;
  color: #425486;
  display: flex;
  font-family: Nunito;
  font-size: $font-size-heading-h3;
  line-height: 24px;
  cursor: pointer;
  font-style: normal;
  border-radius: 12px;
  padding: $spacing-m;
  background-color: #fcfcfd;
  justify-content: space-between;
  text-transform: capitalize;
  box-shadow: inset 0 -1px 0 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(51 51 51 / 20%);
  margin-bottom: $spacing-s;

  &:active {
    background: rgb(128 128 128 / 25%);
    box-shadow: none;
  }

  &__description {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    width: 100%;
    margin-left: $spacing-m;

    .info {
      .el-tag {
        margin-right: $spacing-s;
      }
    }

    p {
      font-size: $font-size-small;
      margin-bottom: 0;
    }
  }
  .el-avatar {
    background: none;
  }
}

.active {
  border: 2px solid;
}
</style>
