<template>
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
        @click="login"
        color="primary" 
        icon="check" 
        label="Iniciar sesion"
        class="mt-8 w-full"
    />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'SingIn',

    components: {

    },
    setup() {
        const form_sing_in = ref({
            email: '',
            password: ''
        });

        const login = () => {
            console.log(form_sing_in.value.email);
            console.log(form_sing_in.value.password);
        };

        return {
            form_sing_in,
            login
        }
    }
})
</script>