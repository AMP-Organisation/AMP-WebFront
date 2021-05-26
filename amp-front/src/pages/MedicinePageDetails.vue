<template>
    <div>
      <div class="row justify-between">
        <div class="col">
          <IconAndTitle :title="message" :icon="'medication'" :color="'cyan-8'"/>
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
      <div class="col">
        <div class="q-mr-md q-ml-md" v-if="this.medicineLoaded !== undefined">
          <!-- :idMed="parseInt(this.medicineLoaded.id)"  -->
          <Medicine :med="this.medicineLoaded" :fullCard="true" :active_principle="this.active_principle" add-to-pillbox="True" ></Medicine>
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
    medicine_id: {
      type: String,
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
      message: 'page de detail du medicament',
      active_principle: null,
      current_user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    loadTheMedicine () {
      axiosInstance.get(`medicines/${this.medicine_id}`).then(elem => {
        this.medicineLoaded = elem.data
      }).catch(error => {
        console.log('ERROR: une erreur est survenue')
        console.log(error)
      })
    }
  },
  created () {
    if (this.medicine === undefined && this.medicine_id) {
      this.loadTheMedicine()
    }
    axiosInstance.post('/health_card/', {
      user_id: this.current_user.id
    }).then(
      resp => {
        this.active_principle = resp.data
      }
    )
  }
}
</script>
