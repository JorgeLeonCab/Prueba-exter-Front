import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    
  }),
  actions: {
    async sendForm(body) {
        const response = await api.post('/create-post', body);
        console.log(response);
        return response;
    }
  },
});