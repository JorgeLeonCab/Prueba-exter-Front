import { ref } from 'vue';
import { useHomeStore } from '../Store/index';

export function useHome() {
  const homeStore = useHomeStore();

  const sendForm = async (body, token) => {
    try {
      const { data } = await homeStore.sendForm(body, token);
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

  const getPosts = async () => {
    try {
      const { data } = await homeStore.getPosts();
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

  const postComment = async (body) => {
    try {
      const { data } = await homeStore.postComment(body);
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

  return {
    sendForm,
    getPosts,
    postComment
  };
}