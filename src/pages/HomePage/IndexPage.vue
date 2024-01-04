<template>
    <div class="pt-[50px] pb-[50px]">
        <Loader
            :loader="loader"
        />
        <q-dialog v-model="dialogModal">
            <q-card class="md:w-1/3 w-2/3 lg:w-1/3">
                <q-card-section>
                    <div class="text-h6">Publicar</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh" class="scroll">
                    <q-input 
                        v-model="pub_form.title"
                        type="text" 
                        label="Titulo" 
                        class="bg-white rounded-lg px-2 py-0 w-auto"
                        :rules="[ val => val && val.length > 0 || 'Ingrese un titulo']"
                    />
                    <q-input
                        v-model="pub_form.content"
                        label="Contenido"
                        type="textarea"
                        rows="4"
                        class="bg-white rounded-lg px-2 py-0 w-auto"
                        :rules="[ val => val && val.length > 0 || 'Ingrese un contenido']"
                    />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn 
                        class="rounded-xl" 
                        flat 
                        label="Cancelar" 
                        color="primary" 
                        v-close-popup 
                    />
                    <q-btn 
                        @click="handleCreatePost"
                        class="rounded-xl" 
                        flat 
                        label="Publicar" 
                        color="primary" 
                        v-close-popup 
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <content-card
            v-if="posts != [] " 
            :data="posts"
            @loaderStatus="loaderStatus"
        />
        <div v-else>
            <q-card class="bg-[#EDF2F4] w-2/3 mx-auto  border-[#D90429] rounded-xl shadow-xl" flat bordered>
                Ahora no hay publicaciones :c
            </q-card>
        </div>

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
import { defineComponent, onMounted, ref, watch } from 'vue'
import Card from 'src/components/Card.vue';
import Loader from  'src/components/Loader.vue';
import { Notify } from 'quasar';
import { useHome } from './Composables/useHomeStore';
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';
export default defineComponent({
    name: 'HomePage',

    components: {
        'content-card': Card,
        Loader
    },
    setup() {
        const { sendForm, getPosts } = useHome();
        const { token, user } = useAuth();
        const posts = ref();
        const loader = ref(false);
        const dialogModal = ref(false);
        const pub_form = ref({
            title: '',
            content: ''
        });


        const handleGetPosts = async () => {
            loader.value = true;
            let { data, success } = await getPosts();
            if (success) {
                posts.value = data;
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
            loader.value = false;
        }

        const handleCreatePost = async () => {
            loader.value = true;
            pub_form.value.user_id = JSON.parse(user).id;
            const { data, success } = await sendForm(pub_form.value, token);
            
            if (success) {
                handleGetPosts();
                pub_form.value = {
                    title: "",
                    content: ""
                }
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
            loader.value = false;
        }

        const loaderStatus = (payload) => {
            loader.value = payload;
        }


        return {
            handleGetPosts,
            handleCreatePost,
            loaderStatus,
            loader,
            dialogModal,
            pub_form,
            posts
        }
    },
    async mounted() {
        this.handleGetPosts();
    }

})

</script>