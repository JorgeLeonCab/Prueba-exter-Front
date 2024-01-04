<template>
    <div v-for="item in data" :key="item">
        <q-card class="bg-[#EDF2F4] w-2/3 mx-auto mt-8 border-[#D90429] rounded-xl shadow-xl" flat bordered>
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
    
                <q-item-section>
                    <q-item-label>
                        {{ item.title }}
                    </q-item-label>
                    <q-item-label caption>
                        Subhead
                    </q-item-label>
                </q-item-section>
            </q-item>
    
            <q-card-section horizontal>
                <q-card-section>
                    {{ item.user.name }}
                </q-card-section>
    
                <q-separator class="m-2" color="red" vertical />
    
                <q-card-section class="text-justify">
                    {{ item.content }}
                </q-card-section>
            </q-card-section>

            <q-separator class="mx-4" />

            <q-card-section align="right">
                <q-btn 
                    v-if="!show_button_comment[item.id]"
                    @click="handleShowCommentForm(item.id, false)"
                    class="rounded-xl italic" 
                    flat 
                    label="Comentarios" 
                    color="black" 
                    v-close-popup 
                />
                <div v-else>
                    <q-input
                        v-model="comment[item.id]"
                        label="Comentario"
                        type="textarea"
                        rows="1"
                        class="bg-white rounded-lg px-2 py-0 w-auto"
                        :rules="[ val => val && val.length > 0 || 'Ingrese un comentario']"
                    />
                    <q-btn 
                        @click="handleShowCommentForm(item.id, false)"
                        class="rounded-xl italic" 
                        flat 
                        label="Cancelar" 
                        color="red" 
                        v-close-popup 
                    />
                    <q-btn 
                        @click="handleShowCommentForm(item.id, true)"
                        class="rounded-xl italic" 
                        flat 
                        label="Enviar" 
                        color="primary" 
                        v-close-popup 
                    />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useHome } from '../pages/HomePage/Composables/useHomeStore';
import { Notify } from 'quasar';
export default defineComponent({
    name: 'HomePage',

    components: {

    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    emits: [
        'loaderStatus'
    ],
    setup(props, { emit }) {
        const { postComment } = useHome();
        const show_button_comment = ref([]);
        const comment = ref([]);
        const form = ref({
            content: '',
            user_id: 1,
            post_id: 0
        })

        const handleShowCommentForm = (card_id, send_comment) => {
            show_button_comment.value[card_id] = !show_button_comment.value[card_id];
            if(send_comment) handlePostComment(card_id);
        };

        const handlePostComment = async (card_id) => {
            emit('loaderStatus', true);
            form.value.post_id = card_id;
            form.value.content = comment.value[card_id];

            const { data, success } = await postComment(form.value);

            if (success) {
                comment.value[card_id] = '';
                form.value = {
                    content: '',
                    user_id: 1,
                    post_id: 0
                }
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }

            emit('loaderStatus', false);
            // handleGetPosts();
        };

        return {
            form,
            show_button_comment,
            comment,
            handlePostComment,
            handleShowCommentForm
        }
    }
})

</script>