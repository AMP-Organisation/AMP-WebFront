<template lang="">
  <div>
    {{message}} :
    {{disease.name_disease}}
    {{disease.id}}
  </div>
</template>
<script>
import * as axios from 'axios'
// a mettre dans les variable
const apiAddr = 'http://localhost:2395/api'

export default {
  name: 'DetailDisease',
  props: {
    disease: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: 'page detals for disease',
      diseases: undefined,
      diseaseCard: {
        name: '',
        description: '',
        isVaccine: false
      }
    }
  },
  methods: {
    getDisease (id) {
      axios.get(`${apiAddr}/diseases/${id}`).then(elem => { this.disease = elem.data })
    },
    async loadOneDisease (id) {
      await axios.get(`${apiAddr}/diseases/${id}`)
    }
  },
  created () {
    this.loadOneDisease(this.diseases.id)
  }
}
</script>
<style lang=""></style>
