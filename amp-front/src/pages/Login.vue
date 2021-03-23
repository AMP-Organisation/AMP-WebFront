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
                ref="email"
                filled
                v-model="input.email"
                label="Your email *"
                hint="email address"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                ref="password"
                filled
                type="text"
                v-model="input.password"
                label="Your password *"
                lazy-rules
                :rules="[
          val => val !== null && val !== '' || 'Please type your password',
          val => val > 0 && val < 3 || 'Please type a real password'
        ]"
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

import { axiosInstance } from 'boot/axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

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
    login () {
      axiosInstance.post('users/get',
        {
          email: this.input.email
        }).then(function (response) {
        /** Find out why redirection not working **/
        console.log(response.data)
      }).catch(function (error) {
        // we get back the error message we setup in our back.
        console.log(error.response.data.detail)
      })
    }
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
