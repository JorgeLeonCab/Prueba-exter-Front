<template>
    <div>
        <q-card class="bg-[#EDF2F4] w-2/3 mx-auto  border-[#D90429] rounded-xl shadow-xl" flat bordered>
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
    
                <q-item-section>
                    <q-item-label>
                        Title
                    </q-item-label>
                    <q-item-label caption>
                        Subhead
                    </q-item-label>
                </q-item-section>
            </q-item>
    
            <q-card-section horizontal>
                <q-card-section>
                    lorem
                </q-card-section>
    
                <q-separator class="m-2" color="red" vertical />
    
                <q-card-section class="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </q-card-section>
            </q-card-section>

            <q-separator class="mx-4" />

            <q-card-section align="right">
                <q-btn class="rounded-xl italic" flat label="Comentarios" color="black" v-close-popup />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'HomePage',

    components: {

    },
    setup() {
        const data = ref('mensaje');
        const dialogModal = ref(false)
        return {
            dialogModal,
            data
        }
    }
})

</script>