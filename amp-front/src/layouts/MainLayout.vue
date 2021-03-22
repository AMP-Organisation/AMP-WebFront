<template>
  <q-layout view='lHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon='menu'
          aria-label='Menu'
          @click='leftDrawerOpen = !leftDrawerOpen'
        />

        <q-toolbar-title>
          {{ app_title }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model='drawer'
      show-if-above
      :mini='!drawer || miniState'
      @click.capture='drawerClick'
      :width='200'
      :breakpoint='500'
      bordered
      content-class='bg-grey-3'
    >
      <q-scroll-area class='fit'>
        <q-list padding>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name='inbox' />
            </q-item-section>
            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple exact to="login">
            <q-item-section avatar>
              <q-icon name='face' />
            </q-item-section>
            <q-item-section>
              Log In
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="disease">
            <q-item-section avatar>
              <q-icon name='send' />
            </q-item-section>
            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item
          to="/info"
          clickable
          v-ripple
          exact>
            <q-item-section avatar>
              <q-icon name='drafts' />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class='q-mini-drawer-hide absolute' style='top: 15px; right: -17px'>
        <q-btn
          dense
          round
          unelevated
          color='accent'
          icon='chevron_left'
          @click='miniState = true'
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'face',
    link: '/info'
  }
]

export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      drawer: false,
      miniState: false,
      app_title: 'Assistant Médical Personnel',
      leftDrawerOpen: false,
      essentialLinks: linksData,
      methods: {
        drawerClick (e) {
          // if in 'mini' state and user
          // click on drawer, we switch it to 'normal' mode
          if (this.miniState) {
            this.miniState = false

            // notice we have registered an event with capture flag;
            // we need to stop further propagation as this click is
            // intended for switching drawer to 'normal' mode only
            e.stopPropagation()
          }
        }
      }
    }
  }
}
</script>
