import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    
  }),
  actions: {
    async sendForm(body, token) {
      const response = await api.post('/post', body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    },

    async getPosts() {
      const response = await api.get('/post')
      return response;
    },

    async postComment(body) {
      const response = await api.post('/comments', body);
      return response;
    }
  },
});