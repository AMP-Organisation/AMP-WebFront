<template>
  <q-card class="dbg-teal text-black" style="width: 300px">
    <q-card-section>
      <div class="text-h6">Demande de validation</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Supprimer ce pillulier ?
    </q-card-section>

    <q-card-actions align="center" class="bg-white text-teal">
      <q-btn flat label="Non" v-close-popup />
      <q-btn flat label="Oui" v-close-popup v-on:click="deletePillbox(pillbox)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'DeletePillbox',
  props: ['pillbox'],
  methods: {
    deletePillbox (pillbox) {
      console.log(pillbox.id)
      axiosInstance.delete('pillbox/deletePillbox', {
        id: pillbox.id
      }).then(
        response => {
          this.$q.notify({
            message: response.data.message,
            icon: 'check'
          })
          this.$router.go(0)
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
