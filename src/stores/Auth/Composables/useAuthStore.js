import { ref } from 'vue';
import { useAuthStore } from '../Store/index.js';

export function useAuth() {
    const authStore = useAuthStore();
    const token = authStore.token;
    const user = authStore.user;

    const setUser = (user) => {
        authStore.setUser(user);
    };

    const setToken = (token) => {
        authStore.setToken(token);
    };

    const clearAuth = () => {
        authStore.clearAuth();
    };

    const logOut = async (user_id) => {
        await authStore.logOut(user_id);
    };

    return {
        setUser,
        setToken,
        clearAuth,
        logOut,
        token,
        user
    }
}