<template lang="">
  <div>
    <div v-if="disease">
      <div class="row q-ml-md">
        <div class="col">
          <h2>{{ disease.name_disease }}</h2>
        </div>
      </div>
      <div class="row q-ml-md">
        <div class="col">
          {{ disease.danger_level }}
          <div v-if="disease.is_treatment">
            There is a treatment
            <q-icon name="check" />
          </div>
          <div v-if="!disease.is_treatment">
            There is NOT a treatment
            <q-icon name="closeh" />
          </div>
          <div v-if="disease.is_vaccine">
            There is a vaccine
            <q-icon name="check" />
          </div>
          <div v-if="!disease.is_vaccine">
            There is NOT a vaccine
            <q-icon name="closeh" />
          </div>
        </div>
      </div>
      <div class="row q-ml-md q-mt-lg">
        <div class="col">
          {{ disease.description }}
        </div>
      </div>
    </div>
    <!-- Une barre de chargement qui ne focntionne pas encore -->
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
    />
  </div>
</template>
<script>
import * as axios from 'axios'

const apiAddr = 'http://localhost:2395/api'

export default {
  name: 'DeseasePageDetails',
  props: {
    id: {
      type: Number,
      default: 42
    }
  },
  data () {
    return {
      message: 'bonjour page de detail des maladie ',
      disease: undefined
    }
  },
  methods: {
    loadDisease () {
      console.log('ici on fera axios')
      axios.get(`${apiAddr}/diseases/${this.id}`).then(elem => {
        this.disease = elem.data
        console.log('la maladie est chargé')
        console.log(this.disease)
      })
    }
  },
  created () {
    console.log('creation ')
    this.loadDisease()
  }
}
</script>
