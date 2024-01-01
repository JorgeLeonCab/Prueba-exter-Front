import { ref } from 'vue';
import { useLoginStore } from '../Store/index';

export function useLogin() {
  const loginStore = useLoginStore();

  const register = (body) => {
    loginStore.register(body)
    .then(({data}) => {
      console.log('Se logro \(._.)/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return {
    register
  };
}