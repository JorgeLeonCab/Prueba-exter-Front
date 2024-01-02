<template>
    <div v-if="loader" id="loader" class="fixed inset-0 flex items-center justify-center w-screen h-screen z-50 bg-[rgba(255, 255, 255, 0.8)] backdrop-blur-lg backdrop-filter">
        <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="sky"
            class="w-3/4 rounded-lg shadow-l"
        />
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'loaderComponent',

    components: {
    },

    props: {
        loader: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { emit }) {
    }
})
</script>