<template>
  <div class="q-pa-md">
    <div v-if="allergy">
      <q-dialog v-model="allergy">
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">{{ $t('dialog_warning') }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ $t('allergy_warning') }}</q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="Ok" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
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
          <q-tab name="existingTreatment" v-bind:label="this.$t('existing_treatment')" />
          <q-tab name="newTreatment" v-bind:label="this.$t('new_treatment')" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="existingTreatment">
            <div class="text-h6">{{ $t('existing_treatment') }}</div>
            <p>{{ $t('select_treatment') }}</p>
            <div class="row q-gutter-y-xl">
              <q-select
                class="GNL__select"
                color="green"
                v-model="select_model"
                use-input
                v-bind:label="this.$t('options_treatment')"
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
                  {{ $t('assign_treatment') }}
                </q-tooltip>
              </q-btn>
            </div >
            <br>
          </q-tab-panel>

          <q-tab-panel name="newTreatment">
            <div class="text-h6">{{ $t('new_treatment') }}</div>
            <p>{{ $t('specify_treatment') }}</p>
            <q-input
              v-model="input.name"
              ref="text"
              v-bind:label="this.$t('treatment_name')"
              v-bind:hint="this.$t('options_treatment')"
              v-bind:rules="[ val => val && val.length > 5 || this.$t('rules_treatment')]"
            />
            <q-input
              v-model="input.description"
              ref="text"
              v-bind:label="this.$t('description_treatment')"
              v-bind:hint="this.$t('options_treatment')"
              v-bind:rules="[ val => val && val.length > 5 || this.$t('rules_treatment')]"
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
                {{ $t('create_treatment') }}
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
  props: ['current_med', 'allergy'],
  data () {
    return {
      tab: 'existingTreatment',
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

      axiosInstance.put('treatment/updateTreatment',
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
            icon: 'warning_amber'
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
