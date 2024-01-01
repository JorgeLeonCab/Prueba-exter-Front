<template>
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
    />
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useLogin } from './Composables/useLoginStore';
export default defineComponent({
    name: 'SingUp',

    components: {

    },
    setup() {
        const { register } = useLogin();
        const form_sing_up = ref({
            name: '',
            email: '',
            password: '',
        });
        const aux = ref('');

        const handleRegister = () => {
            register(form_sing_up.value);
        }

        return {
            form_sing_up,
            aux,
            handleRegister
        }
    }
})
</script>