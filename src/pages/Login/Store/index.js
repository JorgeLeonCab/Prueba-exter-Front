import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    register_user: null,
    login_user: null,
  }),
  actions: {
    async register(body) {
        const response = await api.post('/register', body);
        return response;
    },

    async login(body) {
      const response = await api.post('/login', body);
      return response;
    }
  },
});