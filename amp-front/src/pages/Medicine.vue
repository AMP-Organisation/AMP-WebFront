<template>
  <div>
    <q-page>
      <div class="q-ml-md q-mt-md q-mb-md">
        <div class="row justify-left">
          <div class="col-1">
            <q-icon name="medication" color="cyan-8" :size="'xl'" />
          </div>
          <div class="col">
            <div class="text-h4">{{ intro }}</div>
          </div>
        </div>
      </div>

      <!-- une premiere petite list -->
      <!-- <q-list bordered separator>
        <q-item
          v-for="med in medicine"
          v-bind:key="med.id"
          v-on:click="medicine_selected = med"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ med.name }}</q-item-label>
            <q-item-label caption>{{ med.dose }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list> -->

      <!-- un tableau quasar -->
      <div class="q-pa-md">
        <q-table
          class="my-sticky-column-table"
          title="Medicines"
          :data="medicine"
          :columns="columnsTab"
          row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label | toUpCase }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="positive"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'expand_less' : 'expand_more'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class row>
                  <div class="text-left">
                    This is expand slot for row above: {{ props.row.name }}. And
                    with id : {{ props.row.id }}
                  </div>
                  <Medicine
                    :med="props.row"
                    :id="props.row.id"
                    :name="props.row.name"
                    :description="props.row.description">
                  </Medicine>
                  <q-btn
                    rounded
                    flat
                    color="secondary"
                    icon="double_arrow"
                    :to="{name: 'medicine_details', params:{id: props.row.id} }"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <!-- carte pour ajouter un medicament -->
      <q-card class="my-card q-mt-sm q-mr-md q-ml-md" v-show="addNewMed">
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-h6">Add a new Medicine</div>
              <div class="text-subtitle2"></div>
            </div>
          </div>
          <div class="row" align="right">
            <div align="right">
              <q-btn
                class="justify-end"
                color="warning"
                icon="close"
                v-on:click="addNewMed = !addNewMed"
              />
              <q-btn
          style="background: #FF0080; color: white"
          icon="sick"
          v-on:click="addNewMed = false"
        />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- La liste d'affichage des thumbnail -->
      <!-- <div class="q-pa-md">
        <q-list bordered separator>
          <q-item
            v-for="thb in thumbnail"
            v-bind:key="thb.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>{{ thb.img_name }}</q-item-label>
              <q-img
                :src="thb.img_64"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div> -->
      <div class="row ">
        <div class="col q-mr-xl" align="right">
          <q-btn
            color="warning"
            icon="add"
            v-show="!addNewMed"
            v-on:click="addNewMed = true"
          />
          <q-btn
            color="orange-10"
            icon="add"
            v-show="!addNewMedDialog"
            v-on:click="addNewMedDialog = true"
          />
        </div>
      </div>
      <!-- carte pour ajouter un nouveau medoc -->
      <!-- <div v-show="addNewMed">
        <p>et la il y a la carte pour ajouter un medicament</p>
        <q-btn
          style="background: #FF0080; color: white"
          icon="sick"
          v-on:click="addNewMed = false"
        />
      </div> -->

      <!-- q-dialog pour ajouter une maladie, une deuxieme methode -->
      <q-dialog v-model="addNewMedDialog" persistent>
        <q-card width="1000px">
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h6">Add a new Medicine dialog</div>
                <div class="text-subtitle2"></div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-6">
                <q-input rounded outlined v-model="newMedName" label="Name" />
                <q-input rounded outlined v-model="newMedDescription" class="q-mt-md" label="Description" type="textarea"/>
              </div>
              <div class="col-6">
                <q-input rounded outlined v-model.number="newMedDose" type="number" label="Dose"/>
                <q-input rounded outlined v-model.number="newMedDoseMax" class="q-mt-md"  type="number" label="Dose maximal"/>
                <q-input rounded outlined v-model.number="newMedDelay" class="q-mt-md"  type="number" label="Delay between two"/>
                <q-checkbox dense v-model="isComprime" label="Is un comprimé ?" color="orange" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <div class="row q-mb-sm" >
              <q-btn
                round
                class="justify-end q-mr-sm"
                color="warning"
                icon="close"
                v-on:click="addNewMedDialog = !addNewMedDialog"/>
              <!-- <q-btn
                style="background: #FF0080; color: white"
                icon="sick"
                v-on:click="addNewMedDialog = false"/>
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Add it" color="green-8" v-close-popup v-on:click="addMedicine()"/> -->
              <q-btn
                round
                class="q-mr-xs"
                color="secondary"
                icon="add"
                v-on:click="validateNewMedicine()"/>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'
import Medicine from 'components/Medicine.vue'

export default {
  name: 'medicine_page',
  data () {
    return {
      intro: 'la page de medicament',
      addNewMed: false,
      addNewMedDialog: false,
      medicine: [],
      medicine_selected: undefined,
      thumbnail: [],
      newMedName: '',
      newMedDescription: '',
      newMedDose: 0,
      newMedDoseMax: 0,
      newMedDelay: 0,
      isComprime: true,
      columnsTab: [
        {
          label: 'Name',
          name: 'name',
          required: true,
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          label: 'Dose',
          name: 'Dose',
          required: true,
          field: 'dose'
        },
        {
          label: 'Dose Maximal',
          name: 'Dose Maximal',
          required: true,
          field: 'dose_max'
        },
        {
          label: 'Delay',
          name: 'Delay',
          required: true,
          field: 'delay'
        }
      ]
    }
  },
  components: {
    Medicine
  },
  filters: {
    toUpCase (str) {
      return str.toUpperCase()
    }
  },
  methods: {
    loadDiseases () {
      axiosInstance.get('medicines').then(elem => {
        this.medicine = elem.data
        // this.maxPages = this.disease.length / this.maxPerPage + 1
        // this.diseasePages = this.disease.slice(0, this.maxPerPage)
      })
      // this.maxPages = 6
    },
    loadThumbnail () {
      axiosInstance.get('medicines/thumbnail').then(elem => {
        this.thumbnail = elem.data
        // this.maxPages = this.disease.length / this.maxPerPage + 1
        // this.diseasePages = this.disease.slice(0, this.maxPerPage)
      })
    },
    resetData () {
      this.newMedName = ''
      this.newMedDescription = ''
      this.newMedDose = 0
      this.newMedDoseMax = 0
      this.newMedDelay = 0
      this.addNewMedDialog = false
      this.loadDiseases()
    },
    async postNewMedicine (newMed) {
      console.log(newMed)
      await axiosInstance.post('medicines', newMed)
        .catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        })
      this.resetData()
    },
    getListType () {
      return [1]
    },
    validateNewMedicine () {
      console.log('on va valider le nouveau medicament ')
      var newMed = {
        name: this.newMedName,
        description: this.newMedDescription,
        dose: this.newMedDose,
        dose_max: this.newMedDoseMax,
        list_type: this.getListType(),
        delay: this.newMedDelay
      }
      this.postNewMedicine(newMed)
    },
    doSomething (id) {
      console.log(`j'ai reçu l'id :${id}`)
    }
  },
  created () {
    console.log('medicine page created')
    this.loadDiseases()
    // this.loadThumbnail()
  }
}
</script>
<style lang=""></style>
