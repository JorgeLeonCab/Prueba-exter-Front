import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useLoginStore = defineStore('login', {
  state: () => ({

  }),
  actions: {
    async register(body) {
        console.log('body: ',body);
        const response = await api.get('/register', { params : body});
        console.log(response);
        return response;
    }
  },
});