<template>
    <div>
      <q-card flat bordered class="my-card ">
      <q-card-section>
        <div class="row justify-between">
          <div class="col">
            <div v-if="!editMode">
              <div class="text-h4" v-if="enable_warning">
                {{ name_display | nameWithFirstUpper }}
                <q-icon name="warning" color="red">
                  <q-tooltip content-class="bg-red">{{ $t('allergy') }}</q-tooltip>
                </q-icon>
              </div>
              <div class="text-h4" v-else>{{ name_display | nameWithFirstUpper }}</div>
            </div>
            <div v-else>
              <q-input outlined v-model="medUpName" label="name" stack-label />
            </div>
          </div>
          <div class="col-1">
            <q-btn
              v-if="this.addToPillbox !== false || this.deleteFromPillbox !== true"
              color="secondary"
              icon="add"
              v-on:click="addNewTreatmentDialog = true"
              >
              <q-dialog v-model="addNewTreatmentDialog">
                <AddTreatmentDialog
                :current_med="med"
                :allergy="enable_warning"
                >
                </AddTreatmentDialog>
              </q-dialog>
              <q-tooltip content-class="bg-cyan">
                  <p>{{ $t('assign_to_treatment') }}</p>
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="this.deleteFromPillbox !== false"
              color="red-9"
              icon="clear"
              v-on:click="deleteMedicamentDialog = true">

              <q-dialog v-model="deleteMedicamentDialog">
                <q-card class="dbg-teal text-black" style="width: 300px">
                  <q-card-section>
                    <div class="text-h6">{{ $t('validation') }}</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    {{ $t('delete_medicine') }}
                  </q-card-section>

                  <q-card-actions align="center" class="bg-white text-teal">
                    <q-btn flat label="Non" v-close-popup />
                    <q-btn flat label="Oui" v-close-popup @click="deleteMedicine" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-btn>
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
              <p v-if="this.fullCard === false" class="text-body1 q-mr-md">{{ description_display| crop }}</p>
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
                <q-item-section v-if="!editMode">Dose : {{ this.med.dose }} mg</q-item-section>
                <q-item-section v-else><q-input outlined v-model="medUpDose" label="Dose"  dense stack-label/></q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label v-if="!editMode">{{ $t('max_dose') }} : {{ this.med.dose_max }} mg</q-item-label>
                  <q-item-section v-else><q-input outlined v-model="medUpDoseMax" label="Dose Maximal"  dense stack-label/></q-item-section>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label v-if="!editMode">{{ $t('time') }} {{ this.med.delay }} h</q-item-label>
                  <q-item-section v-else><q-input outlined v-model="medUpDelay" label="Delay"  dense stack-label/></q-item-section>
                </q-item-section>
              </q-item>
            </q-list>
            <p class="text-body1 q-mt-md ">{{ $t('exist_in') }}</p>
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
            <div class="text-h6">{{$t('delete')}} {{ this.med.name }} </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ $t('delete_request') }} {{ this.med.name }}
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
        <q-btn v-if="this.fullCard === true && this.editMode === false" color="teal-7 " icon="edit" v-on:click="enterEdit()">
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
        <q-btn v-if="this.fullCard === true && this.editMode === false" color="negative" icon="delete" v-on:click="confirmDeletion = true">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
        <q-btn v-if="this.fullCard === true && this.editMode" color="teal-9 " icon="save" v-on:click="validateUpdate()">
          <q-tooltip>Save</q-tooltip>
        </q-btn>
        <!-- <q-btn v-if="this.fullCard === true" color="teal-7 " icon="edit" v-on:click="enterEdit()" /> -->

        <q-btn v-if="this.fullCard === false" color="secondary" icon="double_arrow" :to="{name: 'medicine_details', params:{id: parseInt(this.med.id)} }" />
      </q-card-actions>
    </q-card>
    </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import AddTreatmentDialog from 'components/AddTreatmentDialog'

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
    },
    addToPillbox: {
      type: Boolean,
      default: false
    },
    deleteFromPillbox: {
      type: Boolean,
      default: false
    },
    treatment_id: {
      type: Number
    },
    active_principle: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      intro: 'bienvenu dans le composant medicament',
      // l'id principale qu'on init via props si il faut
      id_medicine: undefined,
      // l'objet pricipal qui stocke les données
      medicine: undefined,
      thumbnail: undefined,
      confirmDeletion: false,
      editMode: false,
      // la liste des type de medcimanet : comprimé, gelules, suppositoire, etc...
      typeList: [],
      medUpName: '',
      medUpDescription: '',
      medUpDose: 0,
      medUpDoseMax: 0,
      medUpDelay: 0,
      addNewTreatmentDialog: false,
      deleteMedicamentDialog: false,
      enable_warning: false
    }
  },
  components: {
    AddTreatmentDialog
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
      axiosInstance.get(`medicines/type/${this.id_medicine}`).then(elem => {
        this.typeList = elem.data
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
    },
    getMedicineFullInfo () {
      axiosInstance.get(`medicines/${this.id_medicine}`).then(elem => {
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
      // on recharge la page pour avoir les nouvelles infos
      this.$router.go(0)
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
      this.patchMedicine()
    },
    deleteMedicine () {
      axiosInstance({
        method: 'delete',
        url: 'treatment/deleteMedicine',
        data: {
          id: this.treatment_id,
          medicine_id: this.id_medicine
        }
      }).then(
        response => {
          this.$q.notify({
            message: response.data.message,
            icon: 'check'
          })
          this.$router.go(0)
        }
      ).catch(
        err => {
          this.$q.notify({
            message: err.response.data.detail,
            icon: 'warning_amber'
          })
        }
      )
    },
    printData () {
      console.log('print data')
      console.log(this.med)
      console.log(this.medicine)
      if (this.medicine !== undefined) {
        console.log(this.medicine.id)
      }
      console.log(this.idMed)
      console.log(this.id_medicine)
      console.log(this.med.thumbnail_id)
      console.log('fin de print data')
    }
  },
  created () {
    this.id_medicine = this.med.id
    this.getMedicineFullInfo()
    this.getPicture()
    this.getTypeList()
    if (this.active_principle !== null) {
      if (this.active_principle.allergy.length > 0) {
        this.active_principle.allergy.forEach(element => {
          if (this.med.active_principle.indexOf(element) !== -1) {
            this.enable_warning = true
          }
        })
      }
    }
  }
}
</script>
