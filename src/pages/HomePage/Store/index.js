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

    async getPosts(token) {
      const response = await api.get('/post', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      return response;
    },

    async postComment(body, token) {
      const response = await api.post('/comments', body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    },

    async getCommentsById(id, token) {
      const response = await api.get(`/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    }
  },
});