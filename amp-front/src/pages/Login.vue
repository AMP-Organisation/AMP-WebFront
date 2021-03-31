<template>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../assets/profile.svg" alt="profile picture">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
              <q-input
                v-model="input.email"
                label="Your email *"
                hint="email address"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                type="password"
                v-model="input.password"
                aria-autocomplete="inline"
                :rules="[ val => val && val.length > 5 || 'Please type a strong password']"
                label="Your password *"
              />
              <div>
                <q-btn label="Login" type="button" color="primary" v-on:click="login"/>
                <q-btn
                  flat
                  dense
                  round
                  icon="home"
                  aria-label="Home page"
                  to="/"
                >
                  <q-tooltip>Home</q-tooltip>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
  </q-page>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'src/store/store'
Vue.use(VueRouter)

export default {
  name: 'Login',
  data () {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      const input = this.input
      store.dispatch('login', { input })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
