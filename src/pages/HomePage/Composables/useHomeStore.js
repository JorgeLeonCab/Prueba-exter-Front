import { ref } from 'vue';
import { useHomeStore } from '../Store/index';

export function useHome() {
  const homeStore = useHomeStore();

  const sendForm = async (body) => {
    try {
    const { data } = await homeStore.sendForm(body);;
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
  };
}