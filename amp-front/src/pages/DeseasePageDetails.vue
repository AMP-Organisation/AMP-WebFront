<template lang="">
  <div>
    <q-page>
      <!-- the button to go back to the diseases page  -->
      <div class="row q-ml-md q-mt-md">
        <router-link :to="{name: 'disease'}">
          <q-btn color="warning" icon="keyboard_return">
            <q-tooltip>Go back to diseases Page</q-tooltip>
          </q-btn>
        </router-link>
      </div>
      <!-- Begining of the data itselves  -->
      <div v-if="disease">
        <div class="row q-ml-md">
          <!-- We have a first row with two columns  -->
          <!-- first columns for the name, and first data... -->
          <div class="col">
            <div class="row">
              <!-- Name of the disease  -->
              <h2>{{ disease.name_disease }}</h2>
            </div>
            <div class="row">
              {{ disease.danger_level }}
            </div>
            <div class="row">
              <div v-if="disease.is_treatment">
                There is a treatment
                <q-icon name="check" />
              </div>
              <div v-if="!disease.is_treatment">
                There is NOT a treatment
                <q-icon name="close" />
              </div>
            </div>
            <div class="row">
              <div v-if="disease.is_vaccine">
                There is a vaccine
                <q-icon name="check" />
              </div>
              <div v-if="!disease.is_vaccine">
                There is NOT a vaccine
                <q-icon name="close" />
              </div>
            </div>
          </div>
          <!--... and the second one is for the image  -->
          <div class="col q-mr-xl">
            <!-- <h2>image</h2> -->
            <q-img src="../assets/virus_covid.jpg" :ratio="1" />
          </div>
        </div>
      </div>
      <div class="row q-ml-md q-mt-lg">
        <div class="col">
          <h4>Description :</h4>
        </div>
      </div>
      <div class="row q-ml-md">
        <div class="col">
          {{ disease.description }}
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
    </q-page>
  </div>
</template>
<script>
import * as axios from 'axios'
// import axiosInstance from 'boot/axios.js'

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
      axios.get(`${apiAddr}/diseases/${this.id}`).then(elem => {
        this.disease = elem.data
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    }
  },
  created () {
    this.loadDisease()
  }
}
</script>
