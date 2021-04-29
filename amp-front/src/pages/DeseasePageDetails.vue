<template lang="">
  <div>
    <q-page >
      <div class="row justify-between">
        <div class="col">
          <IconAndTitle :title="title" :icon="'sick'" :color="'red-6'"/>
        </div>
        <div class="col-1">
        <!-- the button to go back to the medicine page  -->
        <div class="row q-ml-md q-mt-md">
          <router-link :to="{name: 'disease'}">
            <q-btn color="warning" icon="keyboard_return">
              <q-tooltip>Go back to diseases Page</q-tooltip>
            </q-btn>
          </router-link>
        </div>
      </div>
      </div>
    <!-- la carte refacto pour afficher une maladie -->
    <div class="q-pb-xl">
      <q-card class="my-card q-mr-md q-ml-md ">
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-h4">{{ disease.name_disease }}</div>
              <div class="text-subtitle2 text-italic" v-if="disease.scientific_name">{{ disease.scientific_name }}</div>
              <div class="text-weight-light" v-else>No scientific name</div>
              </div>
            <div class="col-1">
              <q-icon v-if="disease.is_treatment" name="medication" :size="'xl'" :color="'teal-9'">
                <q-tooltip>There is a treatment</q-tooltip>
              </q-icon>
              <q-icon v-else name="medication" :size="'xl'" :color="'red-9'">
                <q-tooltip>No treatment available</q-tooltip>
              </q-icon>
            </div>
            <div class="col-1">
              <q-icon v-if="disease.is_vaccine" name="local_pharmacy" :size="'xl'" :color="'teal-9'">
                <q-tooltip>There is a vaccin</q-tooltip>
              </q-icon>
              <q-icon v-else name="local_pharmacy" :size="'xl'" :color="'red-9'">
                <q-tooltip>No vaccine available</q-tooltip>
              </q-icon>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="col-8">
              <div class="row q-mb-md">
                <div class="text-body1">{{ disease.description }}</div>
              </div>
              <div class="row q-mb-sm">
                <div class="text-body1 text-teal-9" v-if="disease.is_treatment">There is some treatment available</div>
                <div class="text-body1 text-red-9" v-else>No treatment available</div>
                <!-- v-if="disease.is_treatment"  -->
              </div>
              <div class="row">
                <div class="text-body1 text-teal-9" v-if="disease.is_vaccine">There is some vaccine available</div>
                <div class="text-body1 text-red-9" v-else>No vaccine available</div>
              </div>
            </div>
            <div class="col-3 q-mr-sm">
              <!-- <h2>image</h2> -->
              <q-img src="../assets/virus_covid.jpg" :ratio="1" />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
        </q-card-section>
      </q-card>
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
import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

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
      disease: []
    }
  },
  components: {
    IconAndTitle
  },
  computed: {
    title () {
      return `Information sur : ${this.disease.name_disease}`
    }
  },
  methods: {
    loadDisease () {
      axiosInstance.get(`diseases/${this.id}`).then(elem => {
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
