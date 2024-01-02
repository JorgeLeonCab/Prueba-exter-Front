import { ref } from 'vue';
import { useLoginStore } from '../Store/index';

export function useLogin() {
  const loginStore = useLoginStore();

  const register = async (body) => {
    try {
      const { data } = await loginStore.register(body);
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

  const login = async (body) => {
    try {
      const { data } = await loginStore.login(body);
      if (data == 'Correo o contraseña incorrectos') {
        data.message = data;
        return {
          data: data,
          success: false
        };
      }
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
  }

  return {
    register,
    login
  };
}