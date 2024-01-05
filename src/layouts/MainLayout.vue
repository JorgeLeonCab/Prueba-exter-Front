<template>
  <div>
    <Loader
      :loader="loader"
    />
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-[#D90429]">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
  
          <q-toolbar-title>
            Quasar App
          </q-toolbar-title>
  
          <div>Quasar v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>
      
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        class="bg-[#2B2D42] text-white"
      >
        <q-list>
          <q-item-label
            class="text-white"
            header
          >
            Menu
          </q-item-label>
  
          <EssentialLink
            @handleLoader="handleLoader"
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view class="min-w-screen min-h-screen bg-[#3C3E53]" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Loader from 'src/components/Loader.vue'

const linksList = [
  {
    title: 'Inicio',
    caption: 'Ir al Inicio',
    icon: 'home',
    link: 'http://localhost:9000/#/user/home'
  },
  // {
  //   title: 'Mi perfil',
  //   caption: 'User',
  //   icon: 'person',
  //   link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  // },
  // {
  //   title: 'Amigos',
  //   caption: 'Tu lista de amigos',
  //   icon: 'emoji_people',
  //   link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  // },
  {
    title: 'Panel de administrador',
    caption: 'Administra a los usuarios',
    icon: 'gavel',
    link: 'http://localhost:9000/#/admin/user'
  },
  {
    title: 'Mi LinkedIn',
    caption: 'Jorge León Caballero',
    icon: 'work',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/',
    target: true
  },
  {
    title: 'LogOut',
    caption: 'Cerrar sesion',
    icon: 'logout',
    logout: true
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Loader
  },

  setup () {
    const loader = ref(false);
    const leftDrawerOpen = ref(false);

    const handleLoader = (payload) => {
        loader.value = payload;
    }

    return {
      essentialLinks: linksList,
      loader,
      handleLoader,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
})
</script>