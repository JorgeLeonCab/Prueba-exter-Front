<template>
    <span @keydown.enter="handleLogin">
        <q-input 
            type="text" 
            label="Correo electronico" 
            v-model="form_sing_in.email"
            class="bg-white rounded-lg px-2 py-0 w-auto"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su correo electronico']"
        />
        <q-input 
            type="password" 
            label="Contraseña" 
            v-model="form_sing_in.password"
            class="bg-white rounded-lg px-2 py-0 mt-8 w-auto"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese contraseña']"
        />
        <q-btn
            @click="handleLogin"
            color="primary" 
            icon="check" 
            label="Iniciar sesion"
            class="mt-8 w-full"
        />
    </span>
</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { Notify } from 'quasar'
import { useLogin } from './Composables/useLoginStore';
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';
export default defineComponent({
    name: 'SingIn',

    components: {

    },
    emits: [
        'handleLoader'
    ],
    props: {

    },
    setup(props, { emit }) {
        const instance = getCurrentInstance();
        const { login } = useLogin();
        const { setUser, setToken } = useAuth();
        const form_sing_in = ref({
            email: '',
            password: ''
        });

        const handleLogin = async () => {
            try {
                emit('handleLoader', true);
                const { data, success } = await login(form_sing_in.value);
                emit('handleLoader', false);
                if (success) {
                    setToken(data.data.access_token);
                    setUser(data.data.user);
                    instance.proxy.$router.push("/test");
                } else {
                    Notify.create({
                        type: 'negative',
                        message: data.message
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        return {
            form_sing_in,
            handleLogin
        }
    }
})
</script>