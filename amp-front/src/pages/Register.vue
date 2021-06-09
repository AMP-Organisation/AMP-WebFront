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
            Register
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
         <div class="column items-center">
            <div class ="row">
              <q-input
                v-model="input.first_name"
                ref="first_name"
                class="q-pl-md"
                label="Your first name *"
                hint="Jérome"
                :rules="[ val => val && val.length > 2 || 'Please type something']"
              />
              <q-input
                class="q-pl-md"
                ref="last_name"
                hint="Rousseau"
                v-model="input.last_name"
                aria-autocomplete="inline"
                :rules="[ val => val && val.length > 2 || 'Please type something']"
                label="Your last name *"
              />
            </div>
           <div class ="row">
             <q-input
               v-model="input.email"
               ref="email"
               class="q-pl-md"
               type="email"
               label="Your email *"
               hint="email address"
               :rules="[val => !!val || 'Email is missing', isValidEmail]"
             />
             <q-input
               type="password"
               class="q-pl-md"
               hint="password"
               v-model="input.password"
               :rules="[ val => val && val.length > 5 || 'Please type a strong password']"
               label="Your password *"
             />
           </div>
           <q-input
             v-model="input.username"
             ref="username"
             label="Your username *"
             hint="unknow"
             :rules="[ val => val && val.length > 3 || 'Please type something']"
           />
           <q-input
             class="q-pt-md"
             ref="birthdate"
             filled
             :value="input.birthDate"
             @change="updateDate"
             mask="date"
             label="your birthdate *"
             hint="1998/03/14">
             <template v-slot:append>
               <q-icon name="event" class="cursor-pointer">
                 <q-popup-proxy>
                   <q-date v-model="input.birthDate" ></q-date>
                 </q-popup-proxy>
               </q-icon>
             </template>
           </q-input>
           <q-space/>
           <div class ="row q-pt-md">
             <q-btn label="Register" type="button" color="primary" v-on:click="register"/>
           </div>
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
import { date } from 'quasar'

Vue.use(VueRouter)

const timeStamp = Date.now()
const formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD')

export default {
  name: 'Register',
  data () {
    return {
      input: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        birthDate: formattedDate,
        age: null
      },
      regEmail: ''
    }
  },
  methods: {
    register: function () {
      console.log(this.$refs.email)
      if (this.$refs.first_name.hasError || this.$refs.last_name.hasError || this.$refs.email.hasError ||
        this.$refs.username.hasError || this.$refs.birthdate.hasError) {
        this.$q.notify({
          message: 'Le formulaire contient des erreurs !',
          icon: 'warning'
        })
      } if (this.input.first_name === '' || this.input.last_name === '' || this.input.email === '' ||
        this.input.username === '') {
        this.$q.notify({
          message: 'Le formulaire contient des éléments vide !',
          icon: 'warning'
        })
      } else {
        const input = this.input
        input.age = this.getAge(input.birthDate)
        input.birthDate = date.formatDate(input.birthDate, 'YYYY-MM-DD' + ' 00:00')
        store.dispatch('register', { input })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    },
    updateDate: function (val) {
      this.input.birthDate = val
    },
    isValidEmail: function (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    getAge: function (dateString) {
      const today = new Date()
      const birthDate = new Date(dateString)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>

<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
