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
          <q-tab name="existingTreatment" label="Traitement existant" />
          <q-tab name="newTreatment" label="Nouveau traitement" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="existingTreatment">
            <div class="text-h6">Traitement existant</div>
            <p>Sélectionner le traitement à associer :</p>
            <div class="row q-gutter-y-xl">
              <q-select
                class="GNL__select"
                color="green"
                v-model="select_model"
                use-input
                label="fièvres, maux de ventres, ..."
                :options="options"
                option-value="id"
                option-label="name"
                @filter="filterFn"
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
                v-on:click="addToTreatment"
                >
                <q-tooltip content-class="bg-cyan">
                  Assigné au traitement
                </q-tooltip>
              </q-btn>
            </div >
            <br>
          </q-tab-panel>

          <q-tab-panel name="newTreatment">
            <div class="text-h6">Nouveau Traitement</div>
            <p>Indiqué les information du nouveau traitement :</p>
            <q-input
              v-model="input.name"
              ref="text"
              label="Le nom de votre traitement"
              hint="Maux de tête..."
              :rules="[ val => val && val.length > 5 || 'Votre nom doit comporter plus de 5 caractères...']"
            />
            <q-input
              v-model="input.description"
              ref="text"
              label="La description de votre traitement"
              hint="Pour de faibles migraines.."
              :rules="[ val => val && val.length > 8 || 'Votre nom doit comporter plus de 8 caractères...']"
            />
            <br>
            <div class="column" style="align-items: center">
            <q-btn
              color="secondary"
              icon="add"
              v-close-popup
              v-on:click="createTreatment"
            >
              <q-tooltip content-class="bg-cyan">
                Créé ce traitement
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
  name: 'AddTreatmentDialog',
  props: ['current_med'],
  data () {
    return {
      tab: 'treatment',
      select_model: [],
      current_user: JSON.parse(localStorage.getItem('user')),
      optionsDefault: [],
      options: this.optionsDefault,
      input: {
        name: '',
        description: ''
      }
    }
  },
  created () {
    axiosInstance.get('treatment/treatmentUser/' + this.current_user.id).then(
      response => {
        this.options = response.data
        this.optionsDefault = response.data
      }
    )
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.optionsDefault
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.optionsDefault.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    addToTreatment () {
      this.select_model.medicine_id.push(this.current_med.id)

      axiosInstance.post('treatment/updateTreatment',
        {
          id: this.select_model.id,
          name: this.select_model.name,
          description: this.select_model.description,
          beginning_date: this.select_model.beginning_date,
          ending_date: this.select_model.ending_date,
          medicine_id: this.select_model.medicine_id
        }).then(
        response => {
          this.$q.notify({
            message: response.data.message,
            icon: 'check'
          })
        }
      ).catch(
        err => {
          this.$q.notify({
            message: err.response.data.detail,
            icon: 'warning_ember'
          })
        }
      )
    },
    createTreatment () {
      this.select_model.push(this.current_med.id)
      const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      axiosInstance.post('treatment/createTreatment', {
        name: this.input.name,
        description: this.input.description,
        beginning_date: today,
        medicine_id: this.select_model,
        user_id: this.current_user.id
      }).then(
        response => {
          this.$q.notify({
            message: response.data.message,
            icon: 'check'
          })
        }
      ).catch(
        err => {
          this.$q.notify({
            message: err.response.data.detail,
            icon: 'warning_ember'
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
