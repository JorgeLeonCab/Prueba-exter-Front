<template>
    <div class="min-w-screen min-h-screen bg-[#2b2d42] flex items-center justify-center">
        <div class="mx-auto my-auto w-1/4">
            <q-form class="bg-[#8d99ae] py-4 px-6 rounded-md w-full">
                <strong class=" block text-left text-xl p-1 mb-12">
                    <p 
                        class=""
                        :class="[
                            (selected == 'login') 
                                ? 'text-white non-selected' 
                                : 'text-gray-300 under-trans'
                        ]"
                        @click="selected = 'login'"
                    >
                        LOGIN
                    </p>
                    <p 
                        class="ml-6"
                        :class="[
                            (selected == 'register') 
                                ? 'text-white non-selected' 
                                : 'text-gray-300 under-trans'
                        ]"
                        @click="selected = 'register'"
                    >
                        REGISTER
                    </p>
                </strong>
                <sing-in
                    v-if="selected == 'login'"
                />
                <sing-up
                    v-if="selected == 'register'"
                />
            </q-form>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import SingIn from './SingIn.vue';
import SingUp from './SingUp.vue';
import { useLogin } from './Composables/useLoginStore'

export default defineComponent({
    name: 'LoginP',

    components: {
        'sing-in': SingIn,
        'sing-up': SingUp,
    },
    setup() {
        // const { loginStoreTest } = useLogin();
        const selected = ref('login');


        return {
            selected,
        }
    }
})
</script>
<style>
.under-trans {
    display: inline-block;
    cursor: pointer;
    position: relative;
}

.non-selected {
    display: inline-block;
    cursor: pointer;
    position: relative;
    border-bottom: solid 3px #3498db;
}

.under-trans::after {
    content: '';
    background-color: #3498db;
    height: 3px;
    width: 0%;
    left: 0;
    border-radius: 8px; 
    position: absolute;
    transition: width 0.5s ease;
    margin-top: 25px;
}

.under-trans:hover::after {
    width: 100%;
}
</style>./Composables/useLoginStore