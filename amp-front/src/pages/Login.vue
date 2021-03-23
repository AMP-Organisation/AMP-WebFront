<template lang=''>
  <q-page>
    {{ message }}

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="Your e-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your e-mail']"/>

      <q-input
        filled
        type="text" v-model="firstname" label="Your Firstname "
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your firstname'
        ]"
      />

      <q-input
        filled
        type="text" v-model="lastname" label="Your Lastname "
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your lastname'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import * as axios from 'axios'
const apiAddr = 'http://localhost:2394'

export default {
  name: 'Login',
  data () {
    return {
      accept: false,
      message: 'Log in page',
      lastname: undefined,
      firstname: undefined,
      email: undefined
    }
  },
  methods: {
    async postUser (mail) {
      console.log("on va post l'user")
      const res = await axios.post(`${apiAddr}/user/add`, { email: mail })
      console.log(res)
    },
    validateForm () {
      console.log('on va valider les donnée entrée')
      console.log(this.firstname)
      console.log(this.lastname)
      console.log(this.email)
      this.postUser(this.email)
    },
    onSubmit () {
      console.log('on va submit')
      this.validateForm()
    },
    onReset () {
      this.firstname = ''
      this.lastname = ''
      this.email = ''
    }
  }
}
</script>
<style lang='sass'></style>
