<template>
  <q-layout view="hHh Lpr lff"
  class="shadow-2 rounded-borders"
  >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$q.screen.gt.sm?miniState = !miniState:leftDrawerOpen=!leftDrawerOpen"
        />
        <q-toolbar-title>
          Bienvenue {{ currentUser.username }}
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-lg-sm items-center row no-wrap">
          <div style="margin-right: 20%"
          v-if="connected"
          >
            <q-btn
              style="min-width: 50%; background: transparent"
              v-on:click="logout"
              unelevated
              rounded
              label="Déconexion"
              class="vertical-top"
            />
          </div>
          <div>Quasar v{{ $q.version }}</div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      content-class="bg-blue-1"
      :breakpoint="500"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" :to="{name: link.link }">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset="true" class="q-my-sm"/>

          <q-item class="GNL__drawer-item " v-ripple v-for="link in links2" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" :class="link.color"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import store from 'src/store/store'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      links1: [
        {
          icon: 'move_to_inbox',
          text: 'Inbox',
          link: 'info'
        },
        {
          icon: 'star',
          text: 'Stared'
        },
        {
          icon: 'send',
          text: 'Sent'
        },
        {
          icon: 'error',
          text: 'Spam'
        }
      ],
      links2: [
        {
          icon: 'flag',
          text: 'Updates',
          color: 'text-orange'
        },
        {
          icon: 'group',
          text: 'Social',
          color: 'text-red'
        },
        {
          icon: 'label',
          text: 'Promos',
          color: 'text-indigo-8'
        },
        {
          icon: 'forum',
          text: 'Forums',
          color: 'text-teal'
        }
      ],
      currentUser: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    connected: function () {
      const user = JSON.parse(localStorage.getItem('user'))
      return !!user
    },
    logout: function () {
      store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
