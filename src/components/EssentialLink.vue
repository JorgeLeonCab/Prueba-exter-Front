<template>
  <q-item
    v-if="!logout"
    clickable
    tag="a"
    :target="(target) ? '_blank' : ''"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label class="text-white" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item
    v-else
    class="text-red-500 fixed bottom-0 w-full mb-5"
    clickable
    tag="a"
    @click="handleLogOut"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label class="text-red-400" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import { useAuth } from 'src/stores/Auth/Composables/useAuthStore';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    logout: {
      type: Boolean,
      default: false
    },
    target: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'handleLoader'
  ],

  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const { logOut, user, clearAuth } = useAuth();

    const handleLogOut = () => {
      emit('handleLoader', true);
      let user_id = JSON.parse(user).id;
      clearAuth();
      instance.proxy.$router.push("/");
      logOut(user_id);
      emit('handleLoader', false);
    }

    return {
      handleLogOut
    }
  }
})
</script>
