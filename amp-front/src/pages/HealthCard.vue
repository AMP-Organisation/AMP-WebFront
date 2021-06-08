<template>
  <q-page class="q-pa-sm">
    <div class="column">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg bg-teal-6 text-white">
          <q-card-section class="text-h6 ">
            <div class="text-h6">{{ $t('health_card') }}</div>
            <div class="text-subtitle2">{{ $t('complete_information') }}</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div class="column">
              <q-list class="row">
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      class="GNL__select"
                      multiple
                      use-chips
                      dark
                      color="green"
                      v-model="allergies_model"
                      use-input
                      v-bind:label="this.$t('allergy_options')"
                      :options="allergies_options"
                      option-value="id"
                      option-label="name"
                      @filter="filterAllergie"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      class="GNL__select"
                      multiple
                      use-chips
                      dark
                      color="green"
                      v-model="disease_model"
                      use-input
                      v-bind:label="this.$t('disease_options')"
                      :options="disease_options"
                      option-value="id"
                      option-label="name"
                      @filter="filterDisease"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list>
                <q-item class="q-pt-lg col-lg-6">
                  <q-item-section>
                    <q-select
                      class="GNL__select"
                      dark
                      color="green"
                      v-model="blood_model"
                      use-input
                      v-bind:label="this.$t('blood_group')"
                      :options="blood_option"
                      option-value="id"
                      option-label="name"
                      @filter="filterBlood"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white" @click="persistent_validation = true">{{ $t('save') }}</q-btn>
            <q-dialog v-model="persistent_validation" persistent transition-show="scale" transition-hide="scale">
              <q-card class="bg-teal text-white" style="width: 300px">
                <q-card-section>
                  <div class="text-h6">{{ $t('validation') }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  {{ $t('health_card_detail') }}
                </q-card-section>

                <q-card-actions align="center" class="bg-white text-teal">
                  <q-btn flat v-bind:label="this.$t('no')" v-close-popup />
                  <q-btn flat v-bind:label="this.$t('yes')" v-close-popup @click="saveInformations" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="bg-teal-6 text-white">
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img src="../assets/profile.svg" alt="profile picture">
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">By AMP team</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              {{ $t('welcome_health_card1') }}
              <br>
              <br>
              {{ $t('welcome_health_card2') }}
              <br>
              {{ $t('welcome_health_card3') }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12" v-if="this.information_user !== null">
        <q-card class="card-bg bg-teal-6 text-white">
          <q-card-section class="text-h6 ">
            <div class="text-h6">{{ $t('informations_user_health_card') }}</div>
            <div class="text-subtitle2">{{ $t('actual_information_health') }}</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section v-if="this.information_user.blood_group == null">
                  {{ $t('blood_group') }}
                  <br>
                  {{ $t('blood_missing') }}
                </q-item-section>
                <q-item-section v-else>
                  {{ $t('blood_group') }}
                  <br>
                  {{ this.information_user.blood_group }}
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section v-if="this.information_user.allergy == null">
                  {{ $t('allergy_title') }}
                  <br>
                  {{ $t('no_allergy') }}
                </q-item-section>
                <q-item-section class="row" v-else>
                  {{ $t('allergy_title') }}
                  <br>
                <div v-for="(element, index) in this.information_user.allergy" :key="index">
                  {{ element }}
                 </div>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section v-if="this.information_user.disease == null">
                  {{ $t('chronical_disease')}}
                  <br>
                  {{ $t('no_disease') }}
                </q-item-section>
                <q-item-section v-else>
                  {{ $t('chronical_disease')}}
                  <br>
                  {{ this.information_user.disease }}
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  Votre poids :
                  <br>
                   {{ this.information_user.weight }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white" @click="persistent_delete = true">{{ $t('delete') }}</q-btn>
            <q-dialog v-model="persistent_delete" persistent transition-show="scale" transition-hide="scale">
              <q-card class="bg-teal text-white" style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Demande de validation</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  En supprimant ces informations, nous ne pourrions plus vous aider efficacement, continuer ?
                </q-card-section>

                <q-card-actions align="center" class="bg-white text-teal">
                  <q-btn flat label="Non" v-close-popup />
                  <q-btn flat label="Oui" v-close-popup @click="deleteInformations" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'HealthCard',
  data () {
    return {
      user_details: JSON.parse(localStorage.getItem('user')),
      password_dict: {},
      blood_model: null,
      default_blood: [
        { id: 1, name: 'A+' },
        { id: 2, name: 'A-' },
        { id: 3, name: 'B+' },
        { id: 4, name: 'B-' },
        { id: 5, name: 'AB+' },
        { id: 6, name: 'AB-' },
        { id: 7, name: 'O+' },
        { id: 8, name: 'O-' }
      ],
      blood_option: this.default_blood,
      allergies_model: null,
      allergies_default: [],
      allergies_options: this.allergies_default,
      disease_model: null,
      disease_default: [],
      disease_options: this.disease_default,
      persistent_delete: false,
      persistent_validation: false,
      information_user: null
    }
  },
  created () {
    axiosInstance.get('medicine/')
      .then(
        response => {
          this.allergies_default = response.data
          this.allergies_default = response.data
        }
      )
    this.get_informations_user()
  },
  methods: {
    filterAllergie (val, update) {
      if (val === '') {
        update(() => {
          this.allergies_options = this.allergies_default
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.allergies_options = this.allergies_default.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterBlood (val, update) {
      if (val === '') {
        update(() => {
          this.blood_option = this.default_blood
        })
        return this.blood_option
      }
      update(() => {
        const needle = val.toLowerCase()
        this.blood_option = this.blood_option.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterDisease (val, update) {
      if (val === '') {
        update(() => {
          this.disease_options = this.disease_default
        })
        return this.blood_option
      }
      update(() => {
        const needle = val.toLowerCase()
        this.disease_options = this.disease_default.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    get_informations_user () {
      axiosInstance.post('health_card/', {
        user_id: this.user_details.id
      }).then(
        resp => {
          this.information_user = resp.data
          if (this.information_user.allergy !== null) {
            axiosInstance.post('medicine/find',
              { id: this.information_user.allergy }).then(
              response => {
                const allergyName = []
                const allergy = response.data
                allergy.forEach(value => {
                  allergyName.push(value.name)
                })
                this.$set(this.information_user, 'allergy', allergyName)
              }
            )
          }
        }
      ).catch(
        resp => {
          console.log(resp.response)
          this.$q.notify({
            message: resp.response.data.detail,
            icon: 'warning'
          })
        }
      )
    },
    deleteInformations () {
      axiosInstance.delete('health_card/deleteInformations',
        { data: { user_id: this.user_details.id } }).then(
        resp => {
          this.$q.notify({
            message: resp.data.message,
            icon: 'info'
          })
          location.reload()
        }
      )
    },
    saveInformations () {
      axiosInstance.post('health_card/saveInformations',
        {
          user_id: this.user_details.id,
          allergy: this.allergies_model,
          blood_group: this.blood_model,
          disease: this.disease_model
        }).then(
        resp => {
          this.$q.notify({
            message: resp.data.message,
            icon: 'info'
          })
          location.reload()
        }
      )
    }
  }
}
</script>

<style scoped>
.GNL__select {
  display: flex;
}
</style>
