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
        <!-- Here we can put the "welcome `username`" that we have on the login branch -->
        <q-toolbar-title>
          Quasar App
          {{ appName }}
        </q-toolbar-title>

        <!-- This is the version of quasar. We rmeove it ? -->
        <div>Quasar v{{ $q.version }}</div>
        <!-- This is the menu we ca open from the top rigth buton -->
        <q-btn round>
          <q-icon name="person" size="sm" />
          <q-menu >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Menu</div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Profil</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Data</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Menu 1</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Menu 2</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup>
                    <q-item-section>Help &amp; Feedback</q-item-section>
                  </q-item>
                </q-list>
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="sick" size="xl" />
                </q-avatar>
                <div class="text-h6 q-mt-md q-mb-xs">{{ lastname }}</div>
                <div class="text-body1 q-mt-md q-mb-xs">{{ firstname }}</div>
                <q-btn
                  class="q-mt-md"
                  color="primary"
                  label="Logout"
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
      ]
    }
  },
  computed: {
    fullName () {
      return `${this.lastname} ${this.firstname}`
    }
  }
}
</script>
