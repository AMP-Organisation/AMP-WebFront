<template>
  <div>
    <IconAndTitle :title="this.$t('profil_page')" :icon="'face'" :color="'green-6'"/>
    <q-card class="q-ml-md q-mr-md q-mt-sm">
      <q-card-section class="bg-primary text-white">
        <div class="row">
          <div class="col">
            <div class="text-h4">{{ user.username }}</div>
            <div class="text-subtitle2">{{ $t('profil_page') }}</div>
          </div>
          <div class="col"  align="right">
            <q-icon name="person" class="bg-positive q-mt-sm q-mr-md" size="xl"/>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-separator />
      <q-card-section align="left">
        <div class="row">
          <div class="col-auto">
            <p class="text-h5"><q-icon class="q-mr-sm" name="family_restroom" color="green-6" />{{ $t('last_name') }} : </p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="person" color="green-6" />{{ $t('first_name') }} :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="insert_emoticon" color="green-6" />{{ $t('username') }} :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="email" color="green-6" />e-mail :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="cake" color="green-6" />Age :</p>
            <p class="text-h5"><q-icon class="q-mr-sm" name="height" color="green-6" />{{ $t('height') }}</p>
          </div>
          <div class="col q-ml-sm" align="left">
            <div v-if="!isEdit">
              <p class="text-h5">{{ user.last_name }}</p>
              <p class="text-h5">{{ user.first_name }}</p>
              <p class="text-h5">{{ user.username }}</p>
              <p class="text-h5">{{ user.email }}</p>
              <p class="text-h5">{{ user.age }}</p>
              <p class="text-h5" v-if="user.height!=null">{{ user.height }} m</p>
              <p class="text-h5" v-else>{{ $t('no_information') }}</p>
            </div>
            <div v-if="isEdit" class="col-10">
              <q-input square outlined v-model="majData.editLastName" v-bind:label="this.$t('last_name')" />
              <q-input square outlined v-model="majData.editFirstName" v-bind:label="this.$t('first_name')" />
              <q-input square outlined v-model="majData.editUserName" v-bind:label="this.$t('username')" />
              <q-input square outlined v-model="majData.editEmail" label="e-mail" />
              <q-input square outlined v-model="majData.age" type="number" label="age" />
              <q-input square outlined v-model="majData.height" type="number" v-bind:label="this.$t('height')" />
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
    <q-card class="q-ml-md q-mr-md q-mt-sm">
      <q-card-section class="bg-teal-3">
        <p class="text-h6" >suivi</p>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p>toto</p>
        <div>
          <q-btn color="teal" icon="local_hospital" icon-right="send" label="Suivi IMC" v-on:click="goToFollowUpPage()"/>
        </div>
      </q-card-section>
    </q-card>
    <q-btn class="q-mt-md q-ml-md q-mr-md q-mb-xl" v-on:click="goToTestPage()" color="red-5" icon="add" label="page de test du line chart seul"/>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'profil_page',
  data () {
    return {
      lastname: '',
      user: undefined,
      isEdit: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      majData: {
        editLastName: '',
        editFirstName: '',
        editUserName: '',
        editEmail: '',
        age: 42,
        height: 1.70
      }
    }
  },
  components: {
    IconAndTitle
  },
  methods: {
    startEdition () {
      this.isEdit = true
      this.majData.editLastName = this.user.last_name
      this.majData.editFirstName = this.user.first_name
      this.majData.editUserName = this.user.username
      this.majData.editEmail = this.user.email
      this.majData.age = this.user.age
      this.majData.height = this.user.height
    },
    getUserData () {
      axiosInstance.post('users/get', { email: this.user.email }).then(elem => {
        this.user = elem.data
        localStorage.setItem('user', JSON.stringify(elem.data))
      })
    },
    resetData () {
      this.getUserData()
    },
    goToFollowUpPage () {
      this.$router.push({ path: '/followup', params: { id: this.user.id } })
    },
    goToTestPage () {
      this.$router.push({ path: '/testlinechart', params: { id: this.user.id } })
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
          age: this.majData.age,
          height: this.majData.height,
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
      this.isEdit = false
      this.updateUser()
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>
