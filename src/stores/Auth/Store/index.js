import { defineStore } from 'pinia';
import { getCurrentInstance } from 'vue'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", this.token);
    },
    setUser(user) {
      let string_user = JSON.stringify(user);
      this.user = string_user;
      localStorage.setItem("user", this.user);
    },
    clearAuth() {
      this.token = null;
      localStorage.removeItem('token');
      this.user = null;
      localStorage.removeItem('user');
    },
    async logOut(user_id) {
      await api.post(`/logout/${user_id}`);
    }
  },
});