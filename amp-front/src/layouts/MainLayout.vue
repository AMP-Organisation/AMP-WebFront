<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="
            $q.screen.gt.sm
              ? (miniState = !miniState)
              : (leftDrawerOpen = !leftDrawerOpen)
          "
        />
        <!-- Here we have the app name + welcom to the username -->
        <q-toolbar-title>
          {{ appName }}.
        </q-toolbar-title>
        <!-- boutton deconnexion de nathan a mettre dans le menu -->
        <!-- This is the version of quasar. We rmeove it ? -->
        <div class="q-mr-md">Bienvenue {{ currentUser.username }}</div>
        <!-- This is the menu we ca open from the top rigth buton -->
        <q-btn round style="background: transparent"
        unelevated >
          <q-icon name="person" size="sm" />
          <q-menu >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Menu</div>
                <q-list style="min-width: 100px">
                  <q-item v-ripple
                    :to="{name: 'profil_page'}" clickable v-close-popup>
                    <q-item-section
                    >Profil</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{name: 'option_one'}" clickable v-close-popup>
                    <q-item-section>Menu 1</q-item-section>
                  </q-item>
                  <q-item :to="{name: 'option_two'}" clickable v-close-popup>
                    <q-item-section>Menu 2</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item v-ripple
                    :to="{name: 'settings_page'}" clickable v-close-popup>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{name: 'help_page'}" clickable v-close-popup>
                    <q-item-section>Help &amp; Feedback</q-item-section>
                  </q-item>
                </q-list>
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="sick" size="xl" />
                </q-avatar>
                <div class="text-h6 q-mt-md q-mb-xs">{{ currentUser.last_name }}</div>
                <div class="text-body1 q-mt-md q-mb-xs">{{ currentUser.first_name }}</div>
                <q-btn
                  class="q-mt-md"
                  color="primary"
                  label="Logout"
                  v-on:click="logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
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
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            :to="{ name: link.link }"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset="true" class="q-my-sm" />

          <q-item
            class="GNL__drawer-item "
            v-ripple
            v-for="link in links2"
            :key="link.text"
            :to="{ name: link.link }"
            clickable
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" :class="link.color" />
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
import Vue from 'vue'

import store from 'src/store/store'

export default {
  name: 'MainLayout',
  data () {
    return {
      appName: Vue.prototype.$appName,
      leftDrawerOpen: false,
      miniState: false,
      lastname: 'lastname',
      firstname: 'firstname',
      links1: [
        {
          icon: 'home',
          text: 'Info',
          link: 'info'
        },
        {
          icon: 'star',
          text: 'Places',
          link: 'places'
        },
        {
          icon: 'medication',
          text: 'Medicine',
          link: 'medicine_page'
        },
        {
          icon: 'coronavirus',
          text: 'Symptoms',
          link: 'symptoms'
        },
        {
          icon: 'sick',
          text: 'Diseases',
          link: 'disease',
          color: 'red-8'
        }
      ],
      links2: [
        {
          icon: 'flag',
          text: 'Updates',
          color: 'text-orange'
        },
        {
          icon: 'face',
          text: 'Profile',
          color: 'text-red',
          link: 'profil_page'
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
  },
  computed: {
    fullName () {
      return `${this.lastname} ${this.firstname}`
    }
  }
}
</script>
