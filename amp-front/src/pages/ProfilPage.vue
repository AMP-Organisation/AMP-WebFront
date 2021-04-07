<template lang="">
  <div>
    <div class="row justify-left q-mt-md q-ml-md">
            <q-icon name="face" color="green-6" :size="'xl'" />
            <div class="text-h4 q-ml-md">{{ intro }}</div>
    </div>
    <q-card class="q-ml-md q-mr-md q-mt-sm">
      <q-card-section class="bg-primary text-white">
        <div class="row">
          <div class="col">
            <div class="text-h4">{{ user.username }}</div>
            <div class="text-subtitle2">Profil page</div>
          </div>
          <div class="col"  align="right">
            <q-icon name="person" class="bg-positive q-mt-sm q-mr-md" size="xl"/>
          </div>
        </div>
      </q-card-section>
      <q-separator />
        <!-- <q-card-section align="left">
          <div class="row">
            <div class="col">
              {{ lorem }}
            </div>
            <div class="col">
              {{ lorem }}
            </div>
          </div>
        </q-card-section> -->
      <q-separator />
      <q-card-section align="left">
        <div class="row">
          <div class="col-auto">
            <p class="text-h5"><q-icon class="q-mr-sm" name="family_restroom" color="green-6" />Lastname : </p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="person" color="green-6" />Firstname :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="insert_emoticon" color="green-6" />Username :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="email" color="green-6" />e-mail :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="cake" color="green-6" />Age :</p>
          </div>
          <div class="col q-ml-sm" align="left">
            <div v-if="!isEdit">
              <p class="text-h5">{{ user.last_name }}</p>
              <p class="text-h5">{{ user.first_name }}</p>
              <p class="text-h5">{{ user.username }}</p>
              <p class="text-h5">{{ user.email }}</p>
              <p class="text-h5">{{ user.age }}</p>
            </div>
            <div v-if="isEdit" class="col-10">
              <q-input square outlined v-model="majData.editLastName" label="Last Name" />
              <q-input square outlined v-model="majData.editFirstName" label="First Name" />
              <q-input square outlined v-model="majData.editUserName" label="username" />
              <q-input square outlined v-model="majData.editEmail" label="e-mail" />
              <q-input square outlined v-model="majData.age" type="number" label="age" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          color="positive"
          icon="edit"
          v-on:click="startEdition()"
          v-show="!isEdit"
        />
        <q-btn
          color="green-9"
          icon="check"
          v-on:click="validateUpdate()"
          v-show="isEdit"
        />
        <q-btn
          color="red-9"
          icon="close"
          v-on:click="isEdit = false"
          v-show="isEdit"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'profil_page',
  data () {
    return {
      lastname: '',
      intro: 'Page de profile',
      user: undefined,
      isEdit: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      majData: {
        editLastName: '',
        editFirstName: '',
        editUserName: '',
        editEmail: '',
        age: 42
      }
    }
  },
  methods: {
    startEdition () {
      this.isEdit = true
      this.majData.editLastName = this.user.last_name
      this.majData.editFirstName = this.user.first_name
      this.majData.editUserName = this.user.username
      this.majData.editEmail = this.user.email
      this.majData.age = this.user.age
    },
    getUserData () {
      console.log('axio get user with id')
      axiosInstance.post('users/get', { email: this.user.email }).then(elem => {
        console.log('le nouvel user : ')
        console.log(elem)
        this.user = elem.data
        localStorage.setItem('user', JSON.stringify(elem.data))
      })
    },
    resetData () {
      console.log('reset data TODO')
      this.getUserData()
    },
    updateUser () {
      axiosInstance({
        method: 'put',
        url: 'users/updateUser',
        data: {
          last_name: this.majData.editLastName,
          first_name: this.majData.editFirstName,
          username: this.majData.editUserName,
          email: this.majData.editEmail,
          age: 27,
          id: this.user.id
        }
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    validateUpdate () {
      console.log('on va valider une mise a jour')
      this.isEdit = false
      this.updateUser()
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
    console.log(this.user.last_name)
  }
}
</script>
<style lang="">

</style>
