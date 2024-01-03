<template>
    <div class="pt-[50px] pb-[50px]">
        <q-dialog v-model="dialogModal">
            <q-card class="w-1/3">
                <q-card-section>
                    <div class="text-h6">Publicar</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh" class="scroll">
                    <q-input 
                        type="text" 
                        label="Titulo" 
                        class="bg-white rounded-lg px-2 py-0 w-auto"
                    />
                        <!-- :rules="[ val => val && val.length > 0 || 'Por favor ingrese su correo electronico']"
                        v-model="form_sing_in.email" -->
                        <!-- v-model="texto" -->
                    <q-input
                        label="Contenido"
                        type="textarea"
                        rows="4"
                        class="bg-white rounded-lg px-2 py-0 w-auto"
                    />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn class="rounded-xl" flat label="Cancelar" color="primary" v-close-popup />
                    <q-btn class="rounded-xl" flat label="Publicar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <content-card/>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn 
                fab
                icon="add" 
                class="bg-[#EF233C]"
                @click="dialogModal = true"
            />
        </q-page-sticky>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Card from 'src/components/Card.vue';
export default defineComponent({
    name: 'HomePage',

    components: {
        'content-card': Card
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