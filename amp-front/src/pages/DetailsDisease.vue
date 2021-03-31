<template lang="">
  <div>
    {{message}} :
    {{disease.name_disease}}
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
      console.log('les maladie chargé')
      console.log(this.diseases)
    },
    async loadOneDisease (id) {
      const ret = await axios.get(`${apiAddr}/diseases/${id}`)
      console.log(ret)
    }
  },
  created () {
    this.loadOneDisease(this.diseases.id)
  }
}
</script>
<style lang=""></style>
