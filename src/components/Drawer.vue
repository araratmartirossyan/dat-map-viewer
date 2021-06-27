<template>
  <div class="drawer">
    <div class="drawer__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import '@/assets/styles';

.drawer {
  &__content {
    padding: $spacing-m;
    max-height: 900px;
    box-shadow: 0px 8px 10px -5px rgb(0 0 0 / 20%),
      0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);
    width: 400px;
    background: #fff;
    position: fixed;
    z-index: 1;
    margin: 16px;
    border-radius: 16px;
    overflow: auto;
  }

  .el-input__inner {
    width: 100%;
    border: none;
    background: #fafafe;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0;
  }
}
</style>
