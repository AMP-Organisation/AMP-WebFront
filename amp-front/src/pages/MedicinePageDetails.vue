<template>
    <div>
      <IconAndTitle :title="intro" :icon="'medication'" :color="'cyan-8'"/>
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
        <div class="q-mr-md q-ml-md">
          <Medicine :med="this.medicineLoaded" :id="this.medicineLoaded.id" :fullCard="true"></Medicine>
        </div>
      </div>
    </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'
import Medicine from 'components/Medicine.vue'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

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
    Medicine,
    IconAndTitle
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
      }).catch(error => {
        console.log('ERROR: une erreur est survenue')
        console.log(error)
      })
    }
  },
  created () {
    if (this.medicine === undefined && this.id) {
      this.loadTheMedicine()
    }
  }
}
</script>
