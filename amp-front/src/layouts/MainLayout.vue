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
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
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
        },
        {
          icon: 'outlet',
          text: 'Diseases',
          link: 'disease'
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
  }
}
</script>
