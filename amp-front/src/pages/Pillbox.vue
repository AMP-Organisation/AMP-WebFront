<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-page-container class="container-fluid">
      <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1"
               placeholder="Traitement migraine...">
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search"/>
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
        </template>
      </q-input>
      <div class="q-ma-sm q-mt-md">
        <q-list class="q-ma-sm q-mt-md">
          <q-expansion-item
            v-for=" (pillbox, index) in getResults" :key="index"
            style="border-radius: 10px"
            popup
            header-class="bg-white"
          >
            <!-- Symbole de la maladie -->
            <template v-slot:header>
              <q-item-section avatar>
                <!--
                <q-avatar>
                  <img :src="mail.avatar">
                </q-avatar>
                -->
              </q-item-section>
              <!-- Nom de la maladie, niveau de danger -->
              <q-item-section>
                <q-item-label>{{pillbox.name}}</q-item-label>
                <q-item-label caption>{{pillbox.beginning_date}}</q-item-label>
              </q-item-section>
            </template>

            <q-separator/>
            <q-card>
              <!-- Introduction de la maladie -->
              <q-card-section>
                {{pillbox.description}}
              </q-card-section>
              <!-- Lien la maladie -->
              <q-card-section>
                <q-btn color="primary" icon="more" label="Plus d'informations sur le lieu"
                       v-on:click="$router.push({name:'details_places', params: { current_place: place.id }})"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'Pillbox',
  data () {
    return {
      current_treatment: [],
      currents_pillbox: [],
      search: '',
      current_user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    axiosInstance.post('pillbox/',
      { id: this.current_user.id })
      .then(
        response => {
          this.currents_pillbox = response.data
          this.currents_pillbox.forEach(pillbox => {
            axiosInstance.post('treatment/treatmentRelated',
              { all_treatment: pillbox.list_treatment }).then(
              response => {
                this.current_treatment = response.data
                this.$set(pillbox, 'information_treatment', this.current_treatment)
              }
            )
          })
        }
      )
  },
  computed: {
    getResults () {
      if (this.search === '') { return this.currents_pillbox } else {
        return this.currents_pillbox.filter((result) => {
          return result.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  }
}
</script>

<style>
.GNL__toolbar-input {
  width: 55%;
  margin-left: 20%;
  margin-top: 5%;
  display: flex;
}
</style>
