<template>
    <div>
      <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">

          <div class="col">
            <div class="text-h4">{{ name_display | nameWithFirstUpper }}</div>
          </div>

          <!-- a ne pas supprimer, c'est un menu "burger en boutton" pour une amelioration future -->
          <!-- <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Remove Card</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Send Feedback</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Share</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div> -->

        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="justify-between" >
        <div class="row">
          <div class="col-9">
            <p class="text-body1">{{ description_display }}</p>
          </div>
          <div class="col-3">
            <div v-if="thumbnail">
              <q-img
                :src="thumbnail.img_64"
                spinner-color="white"
              />
            </div>
            <div v-else>
              <p class="text-body1">No picture to display</p>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-actions class="justify-end" >
        <q-btn v-if="this.fullCard == true" color="teal-7 " icon="edit" v-on:click="enterEdit()" />
        <q-btn v-if="this.fullCard == false" color="secondary" icon="double_arrow" :to="{name: 'medicine_details', params:{id: parseInt(this.id)} }" />
      </q-card-actions>
    </q-card>
    </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'Medicine',
  props: {
    med: {
      type: Object,
      default: undefined
    },
    id: {
      type: Number
    },
    name: {
      type: String,
      default: 'default name medicine'
    },
    description: {
      type: String,
      default: 'default for description for medicine'
    },
    fullCard: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    nameWithFirstUpper: function (str) {
      return str.toUpperCase()
    }
  },
  computed: {
    name_display () {
      if (this.med === undefined) {
        return this.name
      } else {
        return this.med.name
      }
    },
    description_display () {
      if (this.med === undefined) {
        return this.description
      } else {
        return this.med.description
      }
    }
  },
  data () {
    return {
      intro: 'bienvenu dans le composant medicament',
      thumbnail: undefined,
      medicine: undefined
    }
  },
  methods: {
    getPicture () {
      if (this.med.thumbnail_id != null) {
        axiosInstance.get(`medicines/thumbnail/${this.med.thumbnail_id}`).then(elem => {
          this.thumbnail = elem.data
        }).catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        })
      }
    },
    getMedicineFullInfo () {
      axiosInstance.get(`medicines/${this.id}`).then(elem => {
        this.medicine = elem.data
        console.log(elem.data)
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    },
    enterEdit () {
      console.log('enter in edit mode')
      // TODO : edition mode for an existing medicine
    }
  },
  created () {
    this.getPicture()
    if (this.med === undefined) {
      this.getMedicineFullInfo()
    }
  }
}
</script>
