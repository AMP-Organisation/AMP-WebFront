<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-black"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="existingPillbox" label="Pillulier existant" />
          <q-tab name="newPillbox" label="Nouveau pillulier" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="existingPillbox">
            <div class="text-h6">Pillulier existant</div>
            <p>Sélectionner un traitement à associer à un pillulier :</p>
            <div class="row q-gutter-y-xl">
              <q-select
                class="GNL__select"
                color="green"
                v-model="selectModelPillbox"
                use-input
                label="pillulier disponibles"
                :options="optionsPillbox"
                option-value="id"
                option-label="name"
                @filter="filterFnPillbox"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-select
                class="GNL__select"
                color="green"
                v-model="selectModeltreatment"
                use-input
                label="traitements disponibles"
                :options="optionsTreatment"
                option-value="id"
                option-label="name"
                @filter="filterFnTreatment"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-space/>
              <q-btn
                color="secondary"
                icon="add"
                v-close-popup
                v-on:click="addToPillbox"
              >
                <q-tooltip content-class="bg-cyan">
                  Assigné au pillulier
                </q-tooltip>
              </q-btn>
            </div >
            <br>
          </q-tab-panel>

          <q-tab-panel name="newPillbox">
            <div class="text-h6">Nouveau pillulier</div>
            <p>Indiqué les informations du nouveau pillulier :</p>
            <q-input
              v-model="input.name"
              ref="text"
              label="Le nom de votre pillulier"
              hint="Maux de tête..."
              :rules="[ val => val && val.length > 5 || 'Votre nom doit comporter plus de 5 caractères...']"
            />
            <q-input
              v-model="input.description"
              ref="text"
              label="La description de votre pillulier"
              hint="Pour de faibles migraines.."
              :rules="[ val => val && val.length > 8 || 'Votre nom doit comporter plus de 8 caractères...']"
            />
            <q-select
              class="GNL__select"
              color="green"
              v-model="selectModeltreatment"
              use-input
              label="traitements disponibles"
              :options="optionsTreatment"
              option-value="id"
              option-label="name"
              @filter="filterFnTreatment"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <br>
            <div class="column" style="align-items: center">
              <q-btn
                color="secondary"
                icon="add"
                v-close-popup
                v-on:click="createPillbox"
              >
                <q-tooltip content-class="bg-cyan">
                  Créé ce pillulier
                </q-tooltip>
              </q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import moment from 'moment'

export default {
  name: 'AddPillboxDialog',
  data () {
    return {
      tab: 'existingPillbox',
      selectModelPillbox: [],
      selectModeltreatment: [],
      current_user: JSON.parse(localStorage.getItem('user')),
      optionsDefaultPillbox: [],
      optionsDefaultTreatment: [],
      optionsPillbox: this.optionsDefaultPillbox,
      optionsTreatment: this.optionsDefaultTreatment,
      input: {
        name: '',
        description: ''
      }
    }
  },
  created () {
    axiosInstance.get('treatment/treatmentUser/' + this.current_user.id).then(
      response => {
        this.optionsTreatment = response.data
        this.optionsDefaultTreatment = response.data
      }
    )
    axiosInstance.post('/pillbox', {
      id: this.current_user.id
    }).then(
      response => {
        this.optionsPillbox = response.data
        this.optionsDefaultPillbox = response.data
      }
    )
  },
  methods: {
    filterFnPillbox (val, update) {
      if (val === '') {
        update(() => {
          this.optionsPillbox = this.optionsDefaultPillbox
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optionsPillbox = this.optionsDefaultPillbox.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnTreatment (val, update) {
      if (val === '') {
        update(() => {
          this.optionsTreatment = this.optionsDefaultTreatment
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optionsTreatment = this.optionsDefaultTreatment.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    addToPillbox () {
      const idPillbox = this.selectModelPillbox.id
      const listTreatment = this.selectModeltreatment.id
      console.log(idPillbox)
      console.log(listTreatment)
      axiosInstance.post('pillbox/updatePillbox',
        {
          id: idPillbox,
          name: this.selectModelPillbox.name,
          description: this.selectModelPillbox.description,
          beginning_date: this.selectModelPillbox.beginning_date,
          ending_date: this.selectModelPillbox.ending_date,
          list_treatment: listTreatment
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
    createPillbox () {
      const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      const listTreatment = []
      listTreatment.push(this.selectModeltreatment.id)
      axiosInstance.post('pillbox/createPillbox', {
        name: this.input.name,
        description: this.input.description,
        beginning_date: today,
        list_treatment: listTreatment,
        user_id: this.current_user.id
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
    }
  }
}
</script>

<style scoped>
.GNL__select {
  width: 75%;
  margin-top: 10%;
  display: flex;
}
</style>
