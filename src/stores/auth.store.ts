import { defineStore } from 'pinia'
import axios from '@/services/rest.service'

export const useAuthStore = defineStore({
  id: 'games',
  state: () => ({
    loading: false,
    loginEror: '',
    token: ''
  }),
  getters: {},
  actions: {
    async login(creds: DAT.GenerateTokenRequest) {
      try {
        const response = await axios<DAT.GenerateTokenResponse>({
          method: 'POST',
          url: '/login',
          data: creds
        })
        localStorage.setItem('token', response.token)
        this.token = response.token
      } catch (err) {
        this.loginEror = err.message
        throw new Error(err)
      }
    }
  }
})
