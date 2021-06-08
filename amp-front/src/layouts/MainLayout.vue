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
          {{ $t('appName') }}
        </q-toolbar-title>
        <!-- boutton deconnexion de nathan a mettre dans le menu -->
        <!-- This is the version of quasar. We rmeove it ? -->
        <div class="q-mr-md">{{ $t('messageNickname') }} {{ currentUser.username }}</div>
        <!-- This is the menu we ca open from the top rigth buton -->
        <q-btn round style="background: transparent"
        unelevated >
          <q-icon name="person" size="sm" />
          <q-menu >
            <div class="row no-wrap q-pa-md">
              <div class="col">
                <div class="text-h6 q-mb-md">Menu</div>
                <q-list style="min-width: 90px">
                  <q-item v-ripple
                    :to="{name: 'profil_page'}" clickable v-close-popup>
                    <q-item-section
                    >{{ $t('profile') }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{name: 'notifications_page'}" clickable v-close-popup>
                    <q-item-section>Notifications</q-item-section>
                  </q-item>
                  <q-item :to="{name: 'HealthCard'}" clickable v-close-popup>
                    <q-item-section>{{ $t('health_card') }}</q-item-section>
                  </q-item>
                  <q-item :to="{name: 'option_two'}" clickable v-close-popup>
                    <q-item-section>Menu 2</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item v-ripple
                    :to="{name: 'settings_page'}" clickable v-close-popup>
                    <q-item-section>{{ $t('settings') }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item :to="{name: 'help_page'}" clickable v-close-popup>
                    <q-item-section>{{ $t('help_feedback') }}</q-item-section>
                  </q-item>
                  <q-item>
                    <div>  </div>
                    <q-btn color="primary" v-for="entry in languages" :key="entry.title" class="GNL__button" @click="changeLocale(entry.language)">
                      {{entry.title}}
                    </q-btn>
                  </q-item>
                </q-list>
              </div>
              <q-separator vertical inset="" class="q-mx-lg" />
              <div class="col-auto">
                <div class="row justify-center">
                  <q-avatar class="q-mt-md">
                    <q-icon name="sick" size="xl" />
                  </q-avatar>
                </div>
                <div class="row justify-center">
                  <div class="text-h6 q-mt-md q-mb-xs">{{ currentUser.last_name }}</div>
                </div>
                <div class="row justify-center">
                  <div class="text-body1 q-mt-md q-mb-xs">{{ currentUser.first_name }}</div>
                </div>
                <div class="row justify-center">
                  <q-btn
                    class="q-mt-xl"
                    color="primary"
                    label="Logout"
                    v-on:click="logout"
                    push
                    size="sm"
                    v-close-popup
                  />
                  </div>
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
            :to="{ name: link.link, params:{p_icon: link.icon, p_name_link: link.text} }"
          >
          <!-- I tried to add props above  -->
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('link' + link.position) }}</q-item-label>
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
              <q-item-label>{{ $t('link' + link.position) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view v-on:activateNotification="getValueNotification"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from 'vue'

import store from 'src/store/store'
import schedule from 'node-schedule'
import { axiosInstance } from 'boot/axios'
import { i18n } from 'boot/i18n'

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
          position: 0,
          link: 'info'
        },
        {
          icon: 'star',
          position: 1,
          link: 'places'
        },
        {
          icon: 'medication',
          position: 2,
          link: 'medicine_page'
        },
        {
          icon: 'coronavirus',
          position: 3,
          link: 'symptoms'
        },
        {
          icon: 'sick',
          position: 4,
          link: 'disease',
          color: 'red-8'
        }
      ],
      links2: [
        {
          icon: 'medical_services',
          position: 5,
          color: 'text-orange',
          link: 'pillbox'
        },
        {
          icon: 'face',
          position: 6,
          color: 'text-red',
          link: 'profil_page'
        },
        {
          icon: 'label',
          position: 7,
          color: 'text-indigo-8',
          link: 'notifications_page'
        },
        {
          icon: 'forum',
          position: 8,
          color: 'text-teal'
        },
        {
          icon: 'feed',
          position: 9,
          color: 'text-red',
          link: 'Covid'
        }
      ],
      currentUser: JSON.parse(localStorage.getItem('user')),
      languages: [
        { language: 'en', title: 'English' },
        { language: 'fr', title: 'Français' }
      ]
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
    },
    getValueNotification (value) {
      if (value) {
        let result = []
        axiosInstance.post('/pillbox/', {
          id: this.currentUser.id
        }).then(
          resp => {
            result = resp.data
            result.forEach(pillbox => {
              if (pillbox.ending_date === null) {
                schedule.scheduleJob('0 12 * * *', () => {
                  this.$notification.show('Rappel pillulier', {
                    body: 'Avez-vous bien pensé à prendres le pillulier : ' + pillbox.name
                  }, {})
                })
              }
            })
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      }
    },
    changeLocale (locale) {
      i18n.locale = locale
    }
  },
  computed: {
    fullName () {
      return `${this.lastname} ${this.firstname}`
    }
  }
}
</script>

<style>
.GNL__button {
  margin: 5%;
}
</style>
