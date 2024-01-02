<template>
    <span @keydown.enter="handleRegister">
        <q-input 
            type="text" 
            label="Nombre" 
            class="bg-white rounded-lg px-2 py-0 w-auto"
            v-model="form_sing_up.name"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre']"
        />
        <q-input 
            type="text" 
            label="Correo electronico" 
            class="bg-white rounded-lg px-2 py-0 mt-8 w-auto"
            v-model="form_sing_up.email"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su correo electronico']"
        />
        <q-input 
            type="password" 
            label="Contraseña" 
            class="bg-white rounded-lg px-2 py-0 mt-8 w-auto"
            v-model="form_sing_up.password"
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese su contraseña']"
        />
        <q-input 
            type="password" 
            label="Verificar contraseña" 
            class="bg-white rounded-lg px-2 py-0 mt-8 w-auto"
            v-model="aux"
            :rules="[ val => val && val.length > 0 && val == form_sing_up.password || 'Las contraseñas no coinciden']"
        />
        <q-btn 
            color="primary" 
            icon="check" 
            label="Registrarme"
            class="mt-8 w-full"
            @click="handleRegister"
            @keydown.enter="handleRegister"
        />
    </span>
</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { useLogin } from './Composables/useLoginStore';
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';
import { Notify } from 'quasar';

export default defineComponent({
    name: 'SingUp',

    components: {
    },
    emits: [
        'handleLoader'
    ],
    props: {

    },
    setup(props, { emit }) {
        const { register } = useLogin();
        const { setUser, setToken } = useAuth();
        const instance = getCurrentInstance();
        const form_sing_up = ref({
            name: '',
            email: '',
            password: '',
        });
        const aux = ref('');

        const handleRegister = async () => {
            try {
                emit('handleLoader', true);
                const { data, success } = await register(form_sing_up.value);
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
        }

        return {
            form_sing_up,
            aux,
            handleRegister
        }
    }
})
</script>