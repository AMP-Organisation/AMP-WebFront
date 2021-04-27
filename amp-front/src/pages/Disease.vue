<template lang="">
  <div>
    <q-page>
      <IconAndTitle :title="intro" :icon="'sick'" :color="'red-6'"/>
      <div class="row justify-center">

      </div>
      <div class="row q-ml-xl justify-center">
        <div class="col">
          <!-- <q-select
          class="col-6"
          outlined
          v-model="disease_selected"
          :options="disease"
          option-label="name_disease"
          label="Disease List"
          /> -->
          <q-input class="col-6" v-model="search" square outlined  type="search" hint="Search a disease">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col q-ml-xl q-mt-sm">
          <q-btn
          round
          color="primary"
          icon="playlist_add"
          v-on:click="newDisease = false"
          v-show="newDisease">
          <q-tooltip>Add a disease</q-tooltip>
        </q-btn>
        </div>
      </div>
      <div class="row">
        <div class="q-pa-md" >
          <div class="col">
            <q-list bordered separator>
              <q-item
              v-for="dis in diseasePages"
              v-bind:key="dis.id"
              v-on:click="disease_selected = dis"
              class="q-my-sm"
              clickable
              v-ripple
              >
              <q-item-section>
                <q-item-label>{{ printDiseaseListTitle(dis) }}</q-item-label>
                <q-item-label caption>{{
                  printDiseaseListDescription(dis)
                }}</q-item-label>
              </q-item-section>
              </q-item>
            </q-list>
            <div class="q-pa-lg flex flex-center">
              <q-pagination
              @input="changePage"
              v-model="current"
              :max="maxPages"
              />
            </div>
          </div> <!-- de la classe col-->
        </div>

        <!-- it is the card which print the data of the disease  style="max-width: 500px"-->
        <div class="col q-ma-md q-mr-xl" >
        <q-card bordered class="my-card col-4" v-if="disease_selected">
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h6">{{ disease_selected.name_disease }}</div>
              </div>
              <div class="col-1">
                  <q-btn class="justify-end" color="warning" icon="close" v-on:click="disease_selected = undefined" />
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            {{ disease_selected.description }}
          </q-card-section>
          <q-card-section>
              <!-- This is the button to open a pop up tp print all the details in a pop up, but it is not finished yet. so that why I comented it
              And it is redundance with the more detail page -->
              <!-- <q-btn color="amber-6" icon="add"  v-on:click="showDetails = true">
                <q-tooltip>More info pop up</q-tooltip>
              </q-btn> -->
              <router-link :to="{name: 'disease_details', params:{id: disease_selected.id} }">
                <q-btn color="primary" icon="double_arrow" class="q-mr-md">
                  <q-tooltip>More info page</q-tooltip>
                </q-btn>
              </router-link>
            <q-btn-group>
              <q-btn color="secondary" icon="edit"  v-if="isAdmin" v-on:click="startEdition">
                <q-tooltip>Edit data</q-tooltip>
              </q-btn>
              <q-btn color="warning" icon="keyboard_return" v-on:click="editDisease = false" v-show="editDisease">
                <q-tooltip>Close details</q-tooltip>
              </q-btn>
              <q-btn color="red-9" icon="close"  v-if="isAdmin"  v-on:click="confirmDeleteDisease = true">
               <q-tooltip>Delete this desease card</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-card-section>

          <!-- The edition part of the card for the disease  -->
          <q-card-section v-if="editDisease">
            <q-input rounded outlined v-model="majDisease.majName" label="name" class=" q-mb-md"/>
            <q-input rounded outlined v-model="majDisease.majDescription" filled type="textarea" label="description" class="q-mt-md q-mb-md min-width: 500px"/>
            <q-btn color="green-9" icon="check"  v-if="isAdmin" v-on:click="validateDiseaseUpdate" >
               <q-tooltip>Validate</q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
        <!-- The card to add a new disease -->
        <q-card class="my-card col-7 q-mt-sm" v-show="!newDisease">
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h6">Add a new disease</div>
                <div class="text-subtitle2"></div>
              </div>
              <div class="col-1">
                <q-btn class="justify-end" color="warning" icon="close" v-on:click="newDisease = !newDisease" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions vertical>
            <div class="row">
              <div class="col">
              <q-input rounded outlined v-model="newDisName" label="Name" />
              <q-input rounded outlined v-model="newDisDescripption" class="q-mt-md" label="Description" type="textarea"/>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <q-card-actions vertical>
                  <q-radio v-model="isVaccine" val="true" label="yes, there is a vaccine" />
                  <q-radio v-model="isVaccine" val="false" label="There is no vaccine" />
                </q-card-actions>
              <q-separator dark inset />
              <q-card-actions vertical>
                <q-radio v-model="isTreatment" val="true" label="yes, there is a treatment" />
                <q-radio v-model="isTreatment" val="false" label="There is no treatment" />
              </q-card-actions>
              <q-input v-model.number="dangerLevel" type="number" filled />
              </div>
              <div class="col-6">
                <q-card-actions vertical>
                  <q-select class="q-mt-md" rounded outlined v-model="disease_type_selected" :options="diseaseType" option-label="type_name" label="Type Disease" />
                </q-card-actions>
              </div>
            </div>
            <q-btn
              round
              color="secondary"
              icon="check_circle_outline"
              v-on:click="validateNewDisease"
            />
          </q-card-actions>
        </q-card>
        </div>
      </div>
      <div>

      <!-- Pop-up card to print deletion confirmation  -->
      <q-dialog v-model="confirmDeleteDisease" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="close" color="red-9" text-color="white" />
            <span class="q-ml-sm" v-if="disease_selected != undefined">Are you sure to delete disease {{ disease_selected.name_disease }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete it" color="red-8" v-close-popup v-on:click="deleteDisease()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      </div>
      <div>

      <q-dialog v-model="showDetails" persistent>
        <q-card>
          <q-card-actions align="left">
            <q-btn flat icon="close" color="warning" v-close-popup />
          </q-card-actions>
          <q-card-section class="row items-center">
            <DetailDisease v-if="disease_selected" :disease="disease_selected"/>
          </q-card-section>
        </q-card>
      </q-dialog>

      </div>
    </q-page>
  </div>
</template>

<script>
import DetailDisease from 'src/components/DetailsDisease'
import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'Disease',
  props: {
    p_icon: {
      type: String,
      default: 'settings'
    },
    p_name_link: {
      type: String,
      default: 'default name link'
    }
  },
  data () {
    return {
      intro: 'page pour les maladie',
      disease_selected: undefined,
      disease_type_selected: undefined,
      copy_disease: [],
      newDisease: true,
      isAdmin: true,
      editDisease: false,
      confirmDeleteDisease: false,
      showDetails: false,
      disease: [],
      diseaseSave: [], // en fait Disease stocke la liste qui s'affiche, et DiseaseSave stocke vraiment tout si on change Disease
      diseaseType: [],
      diseasePages: [],
      // refacto a faire pour les variable de la nouvelle maladie à ajouter
      newDisName: undefined,
      newDisDescripption: undefined,
      isVaccine: 'false',
      isTreatment: 'false',
      dangerLevel: 0,
      maxPages: 6,
      current: 1,
      value: '',
      search: '',
      maxPerPage: 10,
      majDisease: {
        majName: undefined,
        majDescription: undefined
      },
      newDiseaseCard: {
        name: '',
        description: '',
        is_vaccine: false
      }
    }
  },
  components: {
    DetailDisease,
    IconAndTitle
  },
  watch: {
    disease_selected () {
      this.editDisease = false
    },
    // may be improve with regex
    search () {
      console.log(`dans le watcher ${this.search}`)
      this.disease = this.diseaseSave.filter(elem => {
        return elem.name_disease.toLowerCase().match(this.search.toLowerCase())
      })
      this.pageDisease()
      console.log(this.disease)
    }
  },
  methods: {
    pageDisease () {
      this.maxPages = this.disease.length / this.maxPerPage + 1
      this.diseasePages = this.disease.slice(0, this.maxPerPage)
    },
    changePage (page) {
      this.diseasePages = this.disease.slice((this.maxPerPage * (page - 1)), this.maxPerPage * (page))
    },
    loadDiseases () {
      axiosInstance.get('diseases').then(elem => {
        this.disease = elem.data
        this.diseaseSave = elem.data
        this.pageDisease()
      })
      axiosInstance.get('diseases/type').then(elem => {
        this.diseaseType = elem.data
      })
      this.maxPages = 6
    },
    initNewDiseaseCard () {
      this.newDisease = false
    },
    startEdition () {
      this.editDisease = true
      this.majDisease.majName = this.disease_selected.name_disease
      this.majDisease.majDescription = this.disease_selected.description
    },
    updateDisease () {
      axiosInstance({
        method: 'patch',
        url: 'diseases',
        data: {
          id: this.disease_selected.id,
          name: this.majDisease.majName,
          description: this.majDisease.majDescription
        }
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    validateDiseaseUpdate () {
      this.updateDisease()
    },
    showNewDiseaseCard () {
      this.newDisease = false
      this.disease_selected = undefined
    },
    // TODO a refacto : I had some trouble, and now I know why I have to clean it up
    async postNewDisease (newDis) {
      await axiosInstance.post('diseases', newDis)
        .catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        })
      this.resetData()
    },
    deleteDisease () {
      axiosInstance({
        method: 'delete',
        url: 'diseases',
        data: {
          id: this.disease_selected.id
        }
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    validateNewDisease () {
      const body = {
        name_disease: this.newDisName,
        description: this.newDisDescripption,
        is_vaccine: this.isVaccine,
        is_treatment: this.isTreatment,
        danger_level: this.dangerLevel
      }
      this.newDiseaseCard.name = this.newDisName
      this.newDiseaseCard.description = this.newDisDescripption
      this.newDiseaseCard.is_vaccine = this.isVaccine
      this.postNewDisease(body)
      this.newDisease = false
      this.resetData()
    },
    printDiseaseListTitle (dis) {
      return `${dis.name_disease}`
    },
    printDiseaseListDescription (dis) {
      if (dis.description.length < 36) {
        return dis.description
      } else {
        return `description : ${dis.description.slice(0, 36)}...`
      }
    },
    resetData () {
      this.newDiseaseCard.name = ''
      this.newDiseaseCard.description = ''
      this.newDiseaseCard.is_vaccine = ''
      this.editDisease = false
      this.disease_selected = undefined
      this.newDisease = true
      this.loadDiseases()
      this.$forceUpdate()
    }
  },
  created () {
    this.loadDiseases()
    console.log('creation de disease')
    console.log(this.p_icon)
  }
}
</script>
