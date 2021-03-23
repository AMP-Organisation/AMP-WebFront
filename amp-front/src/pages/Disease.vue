<template lang="">
  <q-page>
    {{ intro }}
    <q-select outlined v-model="disease_selected" :options="disease" option-label="name_disease" label="maladie" />
    <!-- <q-select outlined v-model="disease_selected" :options="options" option-label="name_disease" label="maladie" />
    <q-select v-model="value" :options="options" option-label="name_disease"></q-select> -->
    <q-list >
      <q-item v-for="dis in disease" v-bind:key="dis.id" class="q-my-sm" clickable v-ripple>
        {{ printDiseaseList(dis) }}
      </q-item>
    </q-list>
    <q-card class="my-card" v-if="disease_selected">
      <q-card-section>
        {{ disease_selected.description }}
      </q-card-section>
    </q-card>
    <q-btn round color="primary" icon="playlist_add" v-on:click="initNewDiseaseCard" v-show="newDisease" />
    <q-card class="my-card " v-show="!newDisease">
      <q-card-section>
        <div class="text-h6">Add a new disease</div>
        <div class="text-subtitle2"></div>
      </q-card-section>
      <q-card-actions>
        <q-input rounded outlined v-model="newDisName" label="Name" />
        <q-input rounded outlined v-model="newDisDescripption" label="Description" type="textarea"/>
        <q-radio v-model="isVaccine" val="true" label="yes, there is a vaccine" />
        <q-radio v-model="isVaccine" val="false" label="There is no vaccine" />
        <q-btn round color="secondary" icon="check_circle_outline" v-on:click="validateNewDisease"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import * as axios from 'axios'
// a mettre dans les variable
const apiAddr = 'http://localhost:2394'

export default {
  name: 'disease_page',
  data () {
    return {
      intro: 'page pour les maladie',
      disease_selected: undefined,
      copy_disease: [],
      newDisease: true,
      disease: [],
      newDisName: undefined,
      newDisDescripption: undefined,
      isVaccine: 'false',
      value: ''
    }
  },
  methods: {
    // changement : je n'utilise plus async/await
    loadDiseases () {
      axios.get(`${apiAddr}/diseases`).then(elem => { this.disease = elem.data })
      console.log('les maladie chargé')
      console.log(this.disease)
    },
    initNewDiseaseCard () {
      this.newDisease = false
    },
    async postNewDisease (data) {
      console.log('le post de la maladie')
      const res = await axios.post(`${apiAddr}/disease`, data)
      console.log(res)
    },
    validateNewDisease () {
      console.log(`le nom : ${this.newDisName}`)
      console.log(`la ddescripption : ${this.newDisDescripption}`)
      console.log(` is vaccine :${this.isVaccine}`)
    },
    printDiseaseList (dis) {
      console.log(dis)
      return `La maladie : ${dis.n1ame_disease} est :\n${dis.description}`
    }
  },
  created () {
    this.loadDiseases()
  }
}
</script>
