<template>
  <div>
    <q-page class="q-pb-xl">
      <IconAndTitle :title="this.$t('medicine')" :icon="'medication'" :color="'cyan-8'"/>
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
                {{ $t('medicine' + col.label) | toUpCase }}
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
                  <q-card>
                    <q-card-section>
                    <div class="row justify-between">
                    <div class="col q-ml-md q-mt-md">
                      <p class="text-h4">{{props.row.name | toUpCase }}</p>
                      <p class="text-body1">{{props.row.description | crop }}</p>
                    </div>
                    <div class="col-auto q-ml-md q-mt-md">
                      <q-list bordered separator class="q-mr-sm">
                        <q-item>
                          <q-item-section >Dose : {{ props.row.dose }} mg</q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-item-label >Dose Maximum : {{ props.row.dose_max }} mg</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section>
                            <q-item-label >Temps entre deux dose : {{ props.row.delay }} h</q-item-label>
                           <p>{{  }}</p>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    </div>
                    </q-card-section>
                  <q-separator/>
                  <q-card-actions class="justify-end" >
                    <q-btn color="secondary" icon="double_arrow" :to="{name: 'medicine_details', params:{medicine_id: parseInt(props.row.id)} }">
                      <q-tooltip content-class="bg-secondary">More details</q-tooltip>
                    </q-btn>
                  </q-card-actions>
                </q-card>
                  <!-- <div class="row">
                  <Medicine
                    :med="props.row"
                    :idMed="parseInt(props.row.id)"
                    :name="props.row.name"
                    :add-to-pillbox="true"
                    :active_principle="active_principle"
                    :description="props.row.description"
                    >
                  </Medicine>
                  </div> -->
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <!-- bouton pour ajouter un medicament -->
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

      <div class="row ">
        <div class="col q-mr-xl" align="right">
          <q-btn
            color="orange-10"
            icon="add"
            v-show="!addNewMedDialog"
            v-on:click="addNewMedDialog = true">
              <q-tooltip>Add a new medicine</q-tooltip>
            </q-btn>
        </div>
      </div>
      <!-- q-dialog pour ajouter une medicament -->
      <q-dialog v-model="addNewMedDialog"  >
        <q-card >
          <q-card-section class="justify-between">
            <div class="row">
              <div class="col">
                <div class="text-h6">Add a new Medicine dialog</div>
              </div>
              <div class="col-1 q-mr-sm">
              <q-btn
                round
                color="warning"
                icon="close"
                v-on:click="addNewMedDialog = !addNewMedDialog">
                <q-tooltip>Cancel</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row justify-center">
              <div class="col-auto q-mr-sm -qml-sm">
                <q-input  outlined v-model="newMedName" label="Name" />
                <q-input  outlined v-model="newMedDescription" class="q-mt-md" label="Description" type="textarea"/>
              </div>
              <div class="col-auto q-mr-sm -qml-sm">
                <q-input  outlined v-model.number="newMedDose" type="number" label="Dose"/>
                <q-input  outlined v-model.number="newMedDoseMax" class="q-mt-md"  type="number" label="Dose maximal"/>
                <q-input  outlined v-model.number="newMedDelay" class="q-mt-md"  type="number" label="Delay between two"/>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="column">
            <q-checkbox class="col q-ml-md" dense v-model="isComprime" :label="this.$t('is_pill')" color="orange" />
            <q-checkbox class="col q-ml-md" dense v-model="isCapsule" :label="this.$t('is_capsule')" color="amber" />
            <!-- These two commented line are for futur improvment -->
            <!-- <q-checkbox class="col q-ml-md q-mt-sm" dense v-model="bolleanToTest" label="checkbox pour l'ui" color="green" />
            <q-toggle class="col" label="ceci est un label" v-model="bolleanToTest" color="yellow" /> -->
          </q-card-section>
          <q-card-actions align="right">
            <div class="row q-mb-sm" >
              <q-btn
                round
                class="q-mr-xs"
                color="secondary"
                icon="add"
                v-on:click="validateNewMedicine()">
              <q-tooltip>Confirm</q-tooltip>
              </q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page>
  </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'
// import Medicine from 'components/Medicine.vue'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'medicine_page',
  data () {
    return {
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
      isCapsule: false,
      bolleanToTest: true,
      addNewTreatmentDialog: false,
      user_info: [],
      columnsTab: [
        {
          label: '0',
          name: 'name',
          required: true,
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          label: '1',
          name: 'Dose',
          required: true,
          field: 'dose'
        },
        {
          label: '2',
          name: 'Dose Maximal',
          required: true,
          field: 'dose_max'
        },
        {
          label: '3',
          name: 'Delay',
          required: true,
          field: 'delay'
        }
      ]
    }
  },
  components: {
    // Medicine,
    IconAndTitle
  },
  filters: {
    toUpCase (str) {
      return str.toUpperCase()
    },
    crop (str) {
      return str.slice(0, 50) + '...'
    }
  },
  methods: {
    loadMedicine () {
      // may be improve :I dont know if it is better to get all or not
      // but the tab is done to print all
      axiosInstance.get('medicines').then(elem => {
        this.medicine = elem.data
      })
    },
    resetData () {
      this.newMedName = ''
      this.newMedDescription = ''
      this.newMedDose = 0
      this.newMedDoseMax = 0
      this.newMedDelay = 0
      this.addNewMedDialog = false
      this.loadMedicine()
    },
    async postNewMedicine (newMed) {
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
      var newMed = {
        name: this.newMedName,
        description: this.newMedDescription,
        dose: this.newMedDose,
        dose_max: this.newMedDoseMax,
        list_type: this.getListType(),
        delay: this.newMedDelay
      }
      this.postNewMedicine(newMed)
    }
  },
  created () {
    this.loadMedicine()
    this.user_info = JSON.parse(localStorage.getItem('user'))
    console.log('creation created medicine page')
    console.log(this.user_info)
    console.log(this.user_info.fk_group)
  }
}
</script>
