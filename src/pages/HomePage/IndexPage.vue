<template>
    <q-layout>
        <div>
            {{ data }}!!!
        </div>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'HomePage',

    components: {

    },
    setup() {
        const data = ref('mensaje');
        return {
            data
        }
    }
})

</script>