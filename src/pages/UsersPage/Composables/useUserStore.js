import { ref } from 'vue';
import { useUserStore } from '../Store/index';

export function useUser() {
  const userStore = useUserStore();

  const getUsers = async (user_id, token) => {
    try {
      const { data } = await userStore.getUsers(user_id, token);
      return {
          data: data,
          success: true
      };
    } catch (err) {
      return {
          data: err.response.data,
          success: false
      };
    }
  };

  const deleteUser = async (user_id, user, token) => {
    try {
      const { data } = await userStore.deleteUser(user_id, user, token);
      return {
          data: data,
          success: true
      };
    } catch (err) {
      console.log(err);
      return {
          data: err,
          success: false
      };
    }
  };

  const downloadExcel = async () => {
    try {
      const { data } = await userStore.downloadExcel();
      return {
          data: data,
          success: true
      };
    } catch (err) {
      console.log(err);
      return {
          data: err,
          success: false
      };
    }
  };

  return {
    getUsers,
    deleteUser,
    downloadExcel,
  };
}