<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Mi perfil',
    caption: 'User',
    icon: 'person',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Mis intereses',
    caption: 'Que hay hoy de nuevo?',
    icon: 'public',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Amigos',
    caption: 'Tu lista de amigos y mas posibles amigos',
    icon: 'emoji_people',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Mis grupos',
    caption: 'Administra tus grupos',
    icon: 'gavel',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Mensajes',
    caption: 'Habla con un amigo 😁',
    icon: 'chat',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Configuración',
    caption: '',
    icon: 'settings',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
  {
    title: 'Mi LinkedIn',
    caption: 'Jorge León Caballero',
    icon: 'work',
    link: 'https://www.linkedin.com/in/jorge-le%C3%B3n-caballero-9883681b4/'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  mounted () {
    this.leftDrawerOpen = false;
  },

  setup () {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
})
</script>