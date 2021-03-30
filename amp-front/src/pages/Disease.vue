<template lang="">
  <div>
    <q-page>
      {{ intro }}
      <div class="row justify-center">
        <q-select
          class="col-6"
          outlined
          v-model="disease_selected"
          :options="disease"
          option-label="name_disease"
          label="maladie"
        />
      </div>
      <div class="row">
        <div class="q-pa-md" style="max-width: 400px">
          <q-list bordered separator>
            <q-item
              v-for="dis in disease"
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
        </div>

        <div class="q-pa-md" style="max-width: 400px">
        <q-card bordered class="my-card col-4" v-if="disease_selected">
          <q-card-section>
            <div class="text-h6">{{ disease_selected.name_disease }}</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            {{ disease_selected.description }}
          </q-card-section>
          <q-card-section>
            <q-btn-group>
              <q-btn color="primary" icon="double_arrow" />
              <q-btn color="secondary" icon="edit"  v-if="isAdmin" v-on:click="editDisease = true"/>
              <q-btn color="red-9" icon="close"  v-if="isAdmin"  v-on:click="confirmDeleteDisease = true"/>
              <q-btn color="warning" icon="close" v-on:click="editDisease = false" v-show="editDisease" />
            </q-btn-group>
          </q-card-section>
          <q-card-section v-if="editDisease">
            <q-input square outlined v-model="majDisease.majName" label="Square outlined" />
            <q-input square outlined v-model="majDisease.majDescription" label="Square outlined" />
          </q-card-section>
        </q-card>
        </div>
      </div>
      <div>
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

      <div class="row justify-center">
        <q-btn
          round
          color="primary"
          icon="playlist_add"
          v-on:click="initNewDiseaseCard"
          v-show="newDisease"
        />
        <q-card class="my-card col-7" v-show="!newDisease">
          <q-card-section>
            <div class="text-h6">Add a new disease</div>
            <div class="text-subtitle2"></div>
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
            <q-btn
              round
              color="secondary"
              icon="check_circle_outline"
              v-on:click="validateNewDisease"
            />
          </q-card-actions>
        </q-card>
      </div>
      <DetailDisease v-if="disease_selected" :disease="disease_selected"/>
    </q-page>
  </div>
</template>

<script>
import * as axios from 'axios'
import DetailDisease from 'src/pages/DetailsDisease'
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
      disease: [],
      // refacto a faire pour les variable de la nouvelle maladie à ajouter
      newDisName: undefined,
      newDisDescripption: undefined,
      isVaccine: 'false',
      value: '',
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
      axios.get(`${apiAddr}/diseases?limit=100`).then(elem => { this.disease = elem.data })
      console.log('les maladie chargé')
      console.log(this.disease)
    },
    initNewDiseaseCard () {
      this.newDisease = false
    },
    async postNewDisease () {
      console.log('le post de la maladie')
      console.log(this.newDiseaseCard)
      const res = await axios.post(`${apiAddr}/diseases`, this.newDiseaseCard)
      console.log(res)
      this.resetData()
    },
    async deleteDisease () {
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
      })
      /* axios.delete(`${apiAddr}/diseases`, { id: 42 })
        .then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        }) */
      /* await axios.delete(`${apiAddr}/diseases`, '{id: 42}').catch(error => {
        console.log('ERRRR:: ', error.response.data)
      }) */
      console.log('deletion done')
    },
    validateNewDisease () {
      console.log(`le nom : ${this.newDisName}`)
      console.log(`la ddescripption : ${this.newDisDescripption}`)
      console.log(` is vaccine :${this.isVaccine}`)
      this.newDiseaseCard.name = this.newDisName
      this.newDiseaseCard.description = this.newDisDescripption
      this.newDiseaseCard.is_vaccine = this.isVaccine
      this.postNewDisease()
      this.newDisease = false
    },
    printDiseaseListTitle (dis) {
      console.log(dis)
      return `${dis.name_disease}`
    },
    printDiseaseListDescription (dis) {
      console.log(dis)
      return `description : ${dis.description.slice(0, 36)}...`
    },
    resetData () {
      this.newDiseaseCard.name = ''
      this.newDiseaseCard.description = ''
      this.newDiseaseCard.is_vaccine = ''
      this.editDisease = false
      this.disease_selected = undefined
      this.newDisease = false
      this.loadDiseases()
      this.$forceUpdate()
    }
  },
  created () {
    this.loadDiseases()
  }
}
</script>
