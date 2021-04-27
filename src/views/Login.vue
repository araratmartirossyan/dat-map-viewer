<template>
  <page class="login-page">
    <div class="login-page__content">
      <el-image
        class="login-page__poster"
        src="https://images.pexels.com/photos/4905089/pexels-photo-4905089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <div class="login-page__form">
        <div class="login-page__form--heading">
          <el-image
            class="logo"
            src="https://www.dat.de/typo3conf/ext/dat_bootstrap/Resources/Public/Images/dat-logo.svg"
          />
        </div>
        <div class="login-page__form--content">
          <dat-input
            name="customerNumber"
            placeholder="DAT Customer number"
            v-model="authForm.customerNumber"
          />
          <dat-input
            name="user"
            placeholder="Username"
            v-model="authForm.user"
          />
          <dat-input
            name="password"
            placeholder="Password"
            v-model="authForm.password"
            type="password"
          />
          <dat-button @click="handleLogin">Login</dat-button>
        </div>
        <el-alert
          class="login-page__form--error"
          v-if="authStore.loginEror"
          :title="authStore.loginEror"
          type="error"
        />
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'

// Components
import DatInput from '@/components/Form/Input.vue'
import DatButton from '@/components/Button.vue'

// Store
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const router = useRouter()

const authForm = reactive<DAT.AuthForm>({
  password: '',
  customerNumber: '',
  user: ''
})

const handleLogin = async () => {
  try {
    await authStore.login(authForm)
    router.push('/')
  } catch {}
}
</script>

<style lang="scss">
@import '@/assets/styles';

.login-page {
  background-image: url('https://datgroupsolutions.eu/FastTrackAI/Login/assets/img/iStock-898172160%20Foto%20Beking2.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0 5%;
  &__content {
    background-color: $main-bg;
    min-width: 600px;
    display: flex;
    border-radius: $spacing-m;
    width: 100%;
  }
  &__poster {
    width: 100%;
    border-top-left-radius: $spacing-m;
    border-bottom-left-radius: $spacing-m;
  }
  &__form {
    &--content {
      width: 100%;
    }
    width: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 0 $spacing-l;

    .logo {
      width: 80px;
    }

    &--error {
      margin-top: $spacing-s;
    }
  }
}
</style>
