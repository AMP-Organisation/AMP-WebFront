<template>
    <div>
      <q-card flat bordered class="my-card ">
      <q-card-section>
        <div class="row items-center no-wrap">

          <div class="col">
            <div v-if="!editMode">
              <div class="text-h4">{{ name_display | nameWithFirstUpper }}</div>
            </div>
            <div v-else>
              <q-input outlined v-model="medUpName" label="name" stack-label />
            </div>
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
      <q-card-section >
        <div class="row">
          <div class="col-6">
            <div v-if="!editMode">
              <p v-if="this.fullCard == false" class="text-body1 q-mr-md">{{ description_display| crop }}</p>
              <p v-else class="text-body1 q-mr-md">{{ description_display }}</p>
            </div>
            <div v-else class="q-mr-md">
              <q-input
                v-model="medUpDescription"
                filled
                label="description"
                type="textarea"/>
            </div>
          </div>
          <div class="col-3">
            <q-list bordered separator class="q-mr-sm">
              <q-item>
                <q-item-section v-if="!editMode">Dose : {{ this.med.dose }}</q-item-section>
                <q-item-section v-else><q-input outlined v-model="medUpDose" label="Dose"  dense stack-label/></q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label v-if="!editMode">Dose Maximun : {{ this.med.dose_max }}</q-item-label>
                  <q-item-section v-else><q-input outlined v-model="medUpDoseMax" label="Dose Maximal"  dense stack-label/></q-item-section>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label v-if="!editMode">Temps entre deux dose : {{ this.med.delay }}</q-item-label>
                  <q-item-section v-else><q-input outlined v-model="medUpDelay" label="Delay"  dense stack-label/></q-item-section>
                </q-item-section>
              </q-item>
            </q-list>
            <p class="text-body1 q-mt-md ">Existe sous forme :</p>
            <q-list  bordered separator>
              <q-item
              v-for="typemed in typeList"
              v-bind:key="typemed.id"
              >
                <q-item-section>
                  {{ typemed.type }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <!-- part of the thumbnail/picture -->
          <div class="col-3">
            <div v-if="!editMode">
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
            <div v-else>
              <q-input
                @input="val => { file = val[0] }"
                filled
                type="file"
                hint="Thumbnail picture"/>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-dialog v-model="confirmDeletion" persistent  transition-show="scale">
        <q-card style="width: 300px">
          <q-card-section class="bg-negative text-white" >
            <div class="text-h6">Delete {{ this.med.name }} </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Are you sure to delete this medicine : {{ this.med.name }}
          </q-card-section>

          <q-card-actions align="right" >
            <q-btn flat label="Cancel" color="warning" v-close-popup />
            <q-btn flat label="CONFIRM" color="red-9"  v-on:click="deleteIt()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-separator />
      <q-card-actions class="justify-end" >
        <q-btn v-if="this.fullCard === true && this.editMode" color="warning" icon="cancel" v-on:click="editMode = false">
          <q-tooltip>Cancel</q-tooltip>
        </q-btn>
        <q-btn v-if="this.fullCard === true && this.editMode === false" color="teal-7 " icon="edit" v-on:click="enterEdit()" />
        <q-btn v-if="this.fullCard === true && this.editMode === false" color="negative" icon="delete" v-on:click="confirmDeletion = true"  />
        <q-btn v-if="this.fullCard === true && this.editMode" color="teal-9 " icon="save" v-on:click="validateUpdate()">
          <q-tooltip>Save</q-tooltip>
        </q-btn>
        <q-btn v-if="this.fullCard === true" color="teal-7 " icon="edit" v-on:click="enterEdit()" />
        <q-btn v-if="this.fullCard === false" color="secondary" icon="double_arrow" :to="{name: 'medicine_details', params:{id: parseInt(this.id)} }" />
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
    idMed: {
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
  data () {
    return {
      intro: 'bienvenu dans le composant medicament',
      id_medicine: undefined,
      thumbnail: undefined,
      medicine: undefined,
      confirmDeletion: false,
      editMode: false,
      // la liste des type de medcimanet : comprimé, gelules, suppositoire, etc...
      typeList: [],
      medUpName: '',
      medUpDescription: '',
      medUpDose: 0,
      medUpDoseMax: 0,
      medUpDelay: 0
    }
  },
  filters: {
    nameWithFirstUpper: function (str) {
      return str.toUpperCase()
    },
    crop (str) {
      return str.slice(0, 50) + '...'
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
    getTypeList () {
      axiosInstance.get(`medicines/type/${this.med.idMed}`).then(elem => {
        this.typeList = elem.data
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    },
    getMedicineFullInfo () {
      axiosInstance.get(`medicines/${this.idMed}`).then(elem => {
        this.medicine = elem.data
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    },
    patchMedicine () {
      axiosInstance({
        method: 'patch',
        url: 'medicines',
        data: {
          id: this.id_medicine,
          name: this.medUpName,
          description: this.medUpDescription,
          dose: this.medUpDose,
          dose_max: this.medUpDoseMax,
          delay: this.medUpDelay
        }
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    resetData () {
      this.$router.go()
      // this.getMedicineFullInfo()
      // this.editMode = false
    },
    enterEdit () {
      this.editMode = true
      this.medUpName = this.name_display
      this.medUpDescription = this.description_display
      this.medUpDose = this.med.dose
      this.medUpDoseMax = this.med.dose_max
      this.medUpDelay = this.med.delay
      // TODO : edition mode for an existing medicine
    },
    deleteIt () {
      axiosInstance({
        method: 'delete',
        url: 'medicines',
        data: {
          id: this.med.id
        }
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.$router.push({ path: '/medicine' })
      })
    },
    validateUpdate () {
      console.log('validation de la mide a jour')
      this.patchMedicine()
    }
  },
  created () {
    this.getPicture()
    if (this.med === undefined) {
      this.getMedicineFullInfo()
      this.id_medicine = this.med.id
    } else {
      this.id_medicine = this.idMed
    }
    this.getTypeList()
  }
}
</script>
