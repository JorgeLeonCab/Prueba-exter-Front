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

        <q-dialog v-model="commentDialog" class="rounded-2xl shadow-2xl">
            <q-card class="bg-[#EDF2F4] w-2/3 mx-auto mt-8 border-[#D90429] h-2/5" flat bordered>
                <Loader
                    :loader="loaderDialog"
                />
                <div>
                    <div class="bg-[#e1e3e4]">
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                </q-avatar>
                            </q-item-section>
                
                            <q-item-section>
                                <q-item-label>
                                    {{ posts[card_id].title }}
                                </q-item-label>
                                <q-item-label caption>
                                    Subhead
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                
                        <q-card-section horizontal>
                            <q-card-section>
                                {{ posts[card_id].user.name }}
                            </q-card-section>
                
                            <q-separator class="m-2" color="red" vertical />
                
                            <q-card-section class="text-justify">
                                {{ posts[card_id].content }}
                            </q-card-section>
                        </q-card-section>
                    </div>
                    <div v-for="comment in comments_list" :key="comment" class="scroll-auto">
                        <q-separator class="mx-2" color="red"/>  
                        
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar class="mx-auto">
                                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                </q-avatar>
                                <q-item-label caption class="pt-2">
                                    {{ comment.user.name }}
                                </q-item-label>
                            </q-item-section>
                            <q-separator class="m-2" color="red" vertical />
                            <q-card-section class="text-justify">
                                {{ comment.content }}
                            </q-card-section>
                        </q-item>
                    </div>
                    <div class="my-2">
                        <q-input
                            v-model="comment"
                            label="Comentario"
                            type="textarea"
                            rows="1"
                            class="bg-white rounded-lg px-2 py-0 w-[89%] inline-block"
                        />
                        <q-btn 
                            @click="handlePostComment(card_id + 1)"
                            class="rounded-xl italic w-[10%] inline-block h-auto" 
                            flat 
                            label="Enviar" 
                            color="primary" 
                        />
                            <!-- v-close-popup  -->
                    </div>
                </div>
            </q-card>
        </q-dialog>

        <div v-if="posts === undefined" >
            <q-card class="bg-[#EDF2F4] w-2/3 mx-auto  border-[#D90429] rounded-xl shadow-xl" flat bordered>
                Ahora no hay publicaciones :c
            </q-card>
        </div>
        <content-card
            v-else
            :data="posts"
            :showComment="true"
            @loaderStatus="loaderStatus"
            @handleOpenCommentDialog="handleOpenCommentDialog"
        />

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
        const { sendForm, getPosts, getCommentsById, postComment } = useHome();
        const { token, user } = useAuth();
        const card_id = ref(0);
        const posts = ref();
        const loader = ref(false);
        const dialogModal = ref(false);
        const commentDialog = ref(false);
        const comment = ref('');
        const comments_list = ref([]);
        const loaderDialog = ref(false);
        const pub_form = ref({
            title: '',
            content: ''
        });
        const form = ref({
            content: '',
            post_id: 0
        })


        const handleGetPosts = async () => {
            loader.value = true;
            let { data, success } = await getPosts(token);
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

        const handleOpenCommentDialog = async (payload) => {
            loader.value = true;
            card_id.value = payload.card_id;
            const { data, success } = await getCommentsById(card_id.value + 1, token);
            commentDialog.value = payload.dialog;
            loader.value = false;
            if (success) {
                comments_list.value = data;
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
            // loader.value = false;
        }

        const handlePostComment = async (card_id) => {
            loaderDialog.value = true;
            form.value.post_id = card_id;
            form.value.content = comment.value;
            form.value.user_id = JSON.parse(user).id;

            const { data, success } = await postComment(form.value, token);
            loaderDialog.value = false;
            if (success) {
                const { data } = await getCommentsById(card_id, token);
                comments_list.value = data;
                comment.value = '';
                form.value = {
                    content: '',
                    user_id: 0,
                    post_id: 0
                }
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
            // handleGetPosts();
        };


        return {
            handleGetPosts,
            handleCreatePost,
            handleOpenCommentDialog,
            handlePostComment,
            loaderStatus,
            comments_list,
            loader,
            dialogModal,
            commentDialog,
            loaderDialog,
            pub_form,
            posts,
            card_id,
            comment
        }
    },
    async mounted() {
        this.handleGetPosts();
    }

})

</script>