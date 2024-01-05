<template>
    <div class="pt-[50px] pb-[50px]">
        <Loader
            :loader="loader"
        />

        <q-page>
            <q-btn color="primary" icon="check" label="OK" @click="handleDownloadExcel" />
            <q-table
                class="w-4/5 mx-auto rounded-2xl shadow-2xl border-[1px] border-[#D90429] bg-[#EDF2F4]"
                title="Usuarios"
                :rows="users"
                row-key="id"
                :columns="columns"
            >
                <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                        <q-btn 
                            class="bg-[#D90429] rounded-md mx-2"
                            @click="handleDeleteUser(props.row)" 
                            icon="delete" 
                        />
                        <q-btn 
                            class="bg-[#669bbc] rounded-md mx-2"
                            @click="handlePutRole(props.row)" 
                            icon="settings_accessibility" 
                        />
                    </q-td>
                </template>
            </q-table>
        </q-page>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Loader from  'src/components/Loader.vue';
import { Notify } from 'quasar';
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';
import { useUser } from './Composables/useUserStore';

const columns = [
    { name: 'id', required: true, label: 'Id', align: 'left', field: row => row.id, format: val => `${val}`, sortable: true },
    { name: 'name', label: 'Nombre', align: 'center', field: 'name', sortable: true },
    { name: 'email', label: 'E-mail', align: 'center', field: 'email' },
    { name: 'name', label: 'Rol', align: 'center', field: row => row.roles[0].name },
    { name: 'baja', label: 'Baja', align: 'center', field: row => row.baja },
    { name: 'action', label: 'Acción', align: 'center', field: 'action', format: (val, row) => '' },

]

export default defineComponent({
    name: 'UserPage',

    components: {
        Loader
    },
    setup() {
        const loader = ref(false);
        const { getUsers, deleteUser, downloadExcel } = useUser();
        const { token, user } = useAuth();
        const users = ref([])
        const user_id = JSON.parse(user).id;

        const handleGetUsers = async () => {
            loader.value = true;
            const { data, success } = await getUsers(user_id, token);
            loader.value = false;
            if (success) {
                users.value = data;
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
        }

        const handleDeleteUser = async (row) => {
            loader.value = true;
            const { data, success } = await deleteUser(user_id, row, token);
            loader.value = false;
            if (success) {
                handleGetUsers()
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
        };

        const handleDownloadExcel = async () => {
            loader.value = true;
            const { data, success } = await downloadExcel();
            loader.value = false;
            if (success) {
                console.log('yey');
                const fileUrl = data.file;
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = 'users.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                Notify.create({
                    type: 'negative',
                    message: data.message
                });
            }
        };

        const handlePutRole = (row) => {
            console.log(row);
        }

        return {
            columns,
            handleGetUsers,
            handleDeleteUser,
            handlePutRole,
            handleDownloadExcel,
            loader,
            users
        }
    },
    async mounted() {
        this.handleGetUsers();
    }

})

</script>