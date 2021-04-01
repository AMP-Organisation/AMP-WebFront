<template lang="">
  <div>
    <q-page>
      <div class="q-ml-md q-mt-md q-mb-md">
        <div class="row justify-left">
          <div class="col-1">
            <q-icon name="outlet" color="green-12" :size="'xl'" />
          </div>
          <div class="col">
            <div class="text-h4">{{ intro }}</div>
          </div>
        </div>
      </div>
      <div class="row q-ml-xl justify-center">
        <div class="col">
          <q-select
          class="col-6"
          outlined
          v-model="disease_selected"
          :options="disease"
          option-label="name_disease"
          label="Disease List"
          />
        </div>
        <div class="col q-ml-xl justify-left">
          <q-btn
          round
          color="primary"
          icon="playlist_add"
          v-on:click="newDisease = false"
          v-show="newDisease"
        />
        </div>
      </div>
      <div class="row">
        <div class="q-pa-md" > <!-- style="max-width: 400px"-->
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
            <div class="text-h6">{{ disease_selected.name_disease }}</div>
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
            <q-input square outlined v-model="majDisease.majName" label="name"/>
            <q-input square outlined v-model="majDisease.majDescription" filled type="textarea" label="description"/>
            <q-btn color="green-9" icon="check"  v-if="isAdmin" v-on:click="validateDiseaseUpdate" >
               <q-tooltip>Validate</q-tooltip>
            </q-btn>
          </q-card-section>
        </q-card>
        <!-- The card to add a new disease -->
        <q-card class="my-card col-7" v-show="!newDisease">
          <q-card-section>
            <div class="text-h6">Add a new disease</div>
            <div class="text-subtitle2"></div>
            <q-btn color="warning" icon="close" v-on:click="newDisease = !newDisease" />
          </q-card-section>
          <q-card-actions vertical>
            <q-input rounded outlined v-model="newDisName" label="Name" />
            <q-input
              rounded
              outlined
              v-model="newDisDescripption"
              label="Description"
              type="textarea"
            />
            <q-radio
              v-model="isVaccine"
              val="true"
              label="yes, there is a vaccine"
            />
            <q-radio
              v-model="isVaccine"
              val="false"
              label="There is no vaccine"
            />
            <q-radio
              v-model="isTreatment"
              val="true"
              label="yes, there is a treatment"
            />
            <q-radio
              v-model="isTreatment"
              val="false"
              label="There is no treatment"
            />
            <q-input
              v-model.number="dangerLevel"
              type="number"
              filled
              style="max-width: 200px"
            />
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
import * as axios from 'axios'
import DetailDisease from 'src/components/DetailsDisease'

// a mettre dans les variable
const apiAddr = 'http://localhost:2395/api'

export default {
  name: 'Disease',
  data () {
    return {
      intro: 'page pour les maladie',
      disease_selected: undefined,
      copy_disease: [],
      newDisease: true,
      isAdmin: true,
      editDisease: false,
      confirmDeleteDisease: false,
      showDetails: false,
      disease: [],
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
    DetailDisease
  },
  methods: {
    // changement : je n'utilise plus async/await
    loadDiseases () {
      axios.get(`${apiAddr}/diseases?limit=100`).then(elem => {
        this.disease = elem.data
        console.log(this.disease)
        console.log(this.disease.length)
        this.maxPages = this.disease.length / this.maxPerPage + 1
        this.diseasePages = this.disease.slice(0, this.maxPerPage)
      })
      console.log('les maladie chargé')
      console.log(this.disease)
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
      axios({
        method: 'patch',
        url: `${apiAddr}/diseases`,
        data: {
          id: this.disease_selected.id,
          name: this.majDisease.majName,
          description: this.majDisease.majDescription
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    validateDiseaseUpdate () {
      console.log('on va valider la maj des donnée de la maladie')
      console.log(this.disease_selected)
      console.log(this.majDisease.majName)
      console.log(this.majDisease.majDescription)
      this.updateDisease()
    },
    showNewDiseaseCard () {
      this.newDisease = false
      this.disease_selected = undefined
    },
    // TODO a refacto : I had some trouble, and now I know why I have to clean it up
    async postNewDisease (newDis) {
      console.log('le post de la maladie')
      console.log(newDis)
      const res = await axios.post(`${apiAddr}/diseases`, newDis)
        .catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        })
      console.log(res)
      this.resetData()
    },
    deleteDisease () {
      console.log('I am going to delete a disease')
      axios({
        method: 'delete',
        url: `${apiAddr}/diseases`,
        data: {
          id: this.disease_selected.id
        }
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      }).then(() => {
        this.resetData()
      })
    },
    changePage (page) {
      console.log('la nouvelle page : ')
      console.log(page)
      this.diseasePages = this.disease.slice((this.maxPerPage * (page - 1)), this.maxPerPage * (page))
    },
    validateNewDisease () {
      console.log(`le nom : ${this.newDisName}`)
      console.log(`la ddescripption : ${this.newDisDescripption}`)
      console.log(` is vaccine :${this.isVaccine}`)
      const body = {
        name: this.newDisName,
        description: this.newDisDescripption,
        is_vaccine: this.isVaccine,
        is_treatment: this.isTreatment,
        danger_level: this.dangerLevel
      }
      this.newDiseaseCard.name = this.newDisName
      this.newDiseaseCard.description = this.newDisDescripption
      this.newDiseaseCard.is_vaccine = this.isVaccine
      console.log(this.newDiseaseCard)
      console.log('le body')
      console.log(body)
      this.postNewDisease(body)
      this.newDisease = false
      this.resetData()
    },
    printDiseaseListTitle (dis) {
      console.log(dis)
      return `${dis.name_disease}`
    },
    printDiseaseListDescription (dis) {
      console.log(dis)
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
  }
}
</script>
