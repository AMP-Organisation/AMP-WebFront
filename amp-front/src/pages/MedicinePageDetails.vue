<template>
    <div>
      <h2>{{ message }}</h2>
      <div v-if="medicineLoaded">
        <p>{{ medicineLoaded.name }}</p>
      </div>
      <Medicine :med="this.medicineLoaded" :id="this.medicineLoaded.id" :fullCard="true"></Medicine>
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
