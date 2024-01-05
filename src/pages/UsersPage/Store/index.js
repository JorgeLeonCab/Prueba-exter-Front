import { defineStore } from 'pinia';
import { api } from 'boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    
  }),
  actions: {
    async getUsers(user_id, token) {
      let response = await api.get(`/admin/${user_id}/user`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    },

    async deleteUser(user_id, user, token) {
      console.log(user, user_id);
      let response = await api.put(`/admin/${user_id}/user/0`, {
        user: user
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response;
    },

    async downloadExcel() {
      let response = await api.get('/export-users');
      console.log(response);
      return response;
    }
  },
});