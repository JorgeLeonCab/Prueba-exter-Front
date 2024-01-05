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

  const getPosts = async (token) => {
    try {
      const { data } = await homeStore.getPosts(token);
      return {
          data: data,
          success: true
      };
    } catch (err) {
      return {
          data: err,
          success: false
      };
    }
  };

  const postComment = async (body, token) => {
    try {
      const { data } = await homeStore.postComment(body, token);
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

  const getCommentsById = async (id, token) => {
    try {
      const { data } = await homeStore.getCommentsById(id, token);
      return {
          data: data,
          success: true
      };
    } catch (err) {
      return {
          data: err,
          success: false
      };
    }
  };

  return {
    sendForm,
    getPosts,
    postComment,
    getCommentsById
  };
}