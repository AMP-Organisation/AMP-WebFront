<template>
    <div>
      <div class="q-ml-sm q-mt-md q-mb-md">
        <div class="row justify-between">
          <div class="col-1">
            <q-icon name="medication" color="cyan-8" :size="'xl'" />
          </div>
          <div class="col">
            <div class="text-h5 q-mt-sm">{{ message }}</div>
          </div>
          <div class="col-1">
          <!-- the button to go back to the medicine page  -->
          <div class="q-mt-md q-mb-md q-mr-md">
            <router-link :to="{name: 'medicine_page'}">
              <q-btn color="warning" icon="keyboard_return">
                <q-tooltip>Go back to medicine Page</q-tooltip>
              </q-btn>
            </router-link>
          </div>
          </div>
        </div>
      </div>
      <div class="col">
        <!-- <div v-if="medicineLoaded">
          <p>{{ medicineLoaded.name }}</p>
        </div> -->
        <div class="q-mr-md q-ml-md">
          <Medicine :med="this.medicineLoaded" :id="this.medicineLoaded.id" :fullCard="true"></Medicine>
        </div>
      </div>
    </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'
import Medicine from 'components/Medicine.vue'

export default {
  name: 'medicine_detail_page',
  props: {
    medicine: {
      type: Object,
      default: undefined
    },
    id: {
      type: Number,
      default: undefined
    }
  },
  components: {
    Medicine
  },
  data  () {
    return {
      medicineLoaded: undefined,
      message: 'page de detail du medicament'
    }
  },
  methods: {
    loadTheMedicine () {
      axiosInstance.get(`medicines/${this.id}`).then(elem => {
        this.medicineLoaded = elem.data
        // this.maxPages = this.disease.length / this.maxPerPage + 1
        // this.diseasePages = this.disease.slice(0, this.maxPerPage)
      }).catch(error => {
        console.log('ERROR: une erreur est survenue')
        console.lgo(error)
      })
    }
  },
  created () {
    console.log('affichage du detail du medicament')
    console.log(this.id)
    if (this.medicine === undefined && this.id) {
      this.loadTheMedicine()
    }
  }
}
</script>
