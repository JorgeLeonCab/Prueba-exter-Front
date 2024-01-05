<template>
    <div v-for="(item, indice) in data" :key="indice">
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
            
            <q-card-section align="right" v-if="showComment">
                <q-btn 
                    @click="openDialogComments(indice)"
                    class="rounded-xl italic" 
                    flat 
                    label="Comentarios" 
                    color="black" 
                    v-close-popup 
                />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useHome } from '../pages/HomePage/Composables/useHomeStore';
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';
import { Notify } from 'quasar';
export default defineComponent({
    name: 'HomePage',

    components: {

    },
    props: {
        data: {
            type: Object,
            default: null
        },
        showComment: {
            type: Boolean,
            default: false
        }
    },
    emits: [
        'loaderStatus',
        'handleOpenCommentDialog'
    ],
    setup(props, { emit }) {
        const { postComment } = useHome();
        const { token, user } = useAuth();
        const show_button_comment = ref([]);
        const comment = ref([]);
        const form = ref({
            content: '',
            post_id: 0
        })

        const openDialogComments = (card_id) => {
            emit('handleOpenCommentDialog', {dialog: true, card_id: card_id});
        }

        const handleShowCommentForm = (card_id, send_comment) => {
            show_button_comment.value[card_id] = !show_button_comment.value[card_id];
            if(send_comment) handlePostComment(card_id);
        };

        const handlePostComment = async (card_id) => {
            emit('loaderStatus', true);
            form.value.post_id = card_id;
            form.value.content = comment.value[card_id];
            form.value.user_id = JSON.parse(user).id;

            const { data, success } = await postComment(form.value, token);

            if (success) {
                comment.value[card_id] = '';
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
            emit('loaderStatus', false);
        };

        return {
            form,
            show_button_comment,
            comment,
            handlePostComment,
            handleShowCommentForm,
            openDialogComments
        }
    }
})

</script>