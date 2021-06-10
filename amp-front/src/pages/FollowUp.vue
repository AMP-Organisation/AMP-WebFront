<template>
  <div>
    <IconAndTitle :title="this.$t('follow_up_title_page')" :color="'teal-4'" :icon="'moving'" />
    <div class=" q-pb-xl">
      <q-card class="q-ml-md q-mr-md q-mb-md">
        <q-expansion-item
        expand-separator
        v-model="expanded_imc"
        icon="monitor_weight"
        :label="this.$t('follow_up_subtitle')"
        :expand-icon-class="'text-teal-4'"
        :header-class="'text-h5'"
        >
        <!-- premiere partie de la carte avec le titre et l'objectif de poid -->
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="col-1">
                <div v-if="hasReachedObjective()">
                  <div class="text-h3 text-red-9" color="teal-9">
                    {{ objective }}
                  </div>
                </div>
                <div v-else>
                  <div class="text-h3 text-teal-9" color="red-9">
                    {{ objective }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />
        <!-- le line chart CAD le graphique -->
        <q-card-section>
          <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="week" v-model="weekTabObject">
              <FacadeLineChartComponent
              :durationType="'week'"
              :firstData="weekDataTabWeight"
              :secondData="weekDataTabImc"
              :titleChart="'Graphique de l\'évolution sur une semaine'"
              :firstLabel="'poids'"
              :secondLabel="'IMC'"
              />
            </q-tab-panel>
            <q-tab-panel name="month">
              <FacadeLineChartComponent
              :durationType="'month'"
              :firstData="monthDataTabWeight"
              :secondData="monthDataTabImc"
              :titleChart="'Graphique de l\'évolution sur un mois'"
              :firstLabel="'poids'"
              :secondLabel="'IMC'"
              />
            </q-tab-panel>
            <q-tab-panel name="semester">
              <FacadeLineChartComponent
              :durationType="'semester'"
              :firstData="semesterDataTabWeight"
              :secondData="semesterDataTabImc"
              :titleChart="'Graphique de l\'évolution sur un semestre par mois'"
              :firstLabel="'poids'"
              :secondLabel="'IMC'"
              />
            </q-tab-panel>
            <q-tab-panel name="year">
              <FacadeLineChartComponent
              :durationType="'year'"
              :firstData="yearDataTabWeight"
              :secondData="yearDataTabImc"
              :titleChart="'Graphique de l\'évolution sur un an par mois'"
              :firstLabel="'poids'"
              :secondLabel="'IMC'"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-card-section >
          <div class="row">
            <div class="col">
            <q-option-group
                      v-model="panel"
                      inline
                      :options="[
                        { label: this.$t('week_tlt'), value: 'week' },
                        { label: this.$t('month_tlt'), value: 'month' },
                        { label: this.$t('semester_tlt'), value: 'semester' },
                        { label: this.$t('year_tlt'), value: 'year' }
                      ]"
                    />
            </div>
          </div>
        </q-card-section>
        <!-- la deuxieme partie avec la liste et la carte a coté -->
        <q-card-section>
          <div class="row">
            <!-- la section a droite de la liste -->
            <div class="col-6">
                <div class="q-pa-md">
                  <div class="" >
                    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
                      <!-- par semaine -->
                      <q-tab-panel name="week">
                        <div class="text-h5 q-mb-sm">
                          {{ this.$t('week') }}
                        </div>
                        <q-list
                          bordered
                          separator
                          v-for="wdata in weekTabObject"
                          v-on:click="weightWeekSelected = wdata"
                          v-bind:key="wdata.date">
                          <q-item clickable v-ripple>
                            <q-item-section class="col-1">
                              <progress-icone :dataComponent="wdata"></progress-icone>
                            </q-item-section>
                            <q-item-section class="col">
                              <q-item-label>Le : {{ wdata.date | formatTheDate }}</q-item-label>
                              <q-item-label>Poids de : {{ wdata.weight }} </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-tab-panel>
                      <!-- par mois -->
                      <q-tab-panel name="month">
                        <div class="text-h6">Month</div>
                          <q-list
                            bordered
                            separator
                            v-for="mData in monthTabObject"
                            v-bind:key="mData.date">
                            <q-item clickable v-ripple>
                              <progress-icone :dataComponent="mData"></progress-icone>
                              <q-item-section class="col">
                                <q-item-label>Le : {{ mData.date | formatTheDate }}</q-item-label>
                                <q-item-label>Poids de : {{ mData.weight }} </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                      </q-tab-panel>
                      <!-- par semestre (enfin je ne sais pas si on le gardera celui ci) -->
                      <q-tab-panel name="semester">
                        <div class="text-h6">Semestre</div>
                        <q-list bordered separator v-for="sData in semesterTabObject" v-bind:key="sData.date">
                            <q-item clickable v-ripple>
                              <progress-icone :dataComponent="sData"></progress-icone>
                              <q-item-section class="col">
                                <q-item-label>Le : {{ sData.date | formatTheDate }}</q-item-label>
                                <q-item-label>Poids de : {{ sData.weight }} </q-item-label>
                              </q-item-section>
                            </q-item>
                        </q-list>
                      </q-tab-panel>
                      <!-- par an  -->
                      <q-tab-panel name="year">
                        <div class="text-h6">Année</div>
                        <q-list bordered separator v-for="sData in yearTabObject" v-bind:key="sData.date">
                            <q-item clickable v-ripple>
                              <progress-icone :dataComponent="sData"></progress-icone>
                              <q-item-section class="col">
                                <q-item-label>Le : {{ sData.date | formatTheDate }}</q-item-label>
                                <q-item-label>Poids de : {{ sData.weight }} </q-item-label>
                              </q-item-section>
                            </q-item>
                        </q-list>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>
            </div>

            <!-- le bouton d'ajout de donnée suivi de la carte d'ajout de donnée -->
            <div class="col-6">
              <q-btn
                color="positive"
                icon="add"
                v-on:click="addNewData = !addNewData"
                v-if="!addNewData"
              >
                <q-tooltip>{{this.$t('add_data')}}</q-tooltip>
              </q-btn>
              <q-btn
                color="amber-8"
                icon="cancel"
                v-on:click="addNewData = !addNewData"
                v-if="addNewData"
              >
                <q-tooltip>{{this.$t('cancel')}}</q-tooltip>
              </q-btn>

              <!-- la carte pour ajouter une donnée de suivi d'imc -->
              <q-card class="q-mt-md" v-if="addNewData">
                <q-card-section>
                  <div class="text-h5">{{this.$t('add_data')}}</div>
                </q-card-section>
                <q-separator/>
                <q-card-section>
                  <q-form
                    class="q-gutter-md"
                  >
                    <q-input filled v-model="new_weight" :label="this.$t('cur_weight')" hint="in kg" />
                    <q-input filled v-model="imcComputation" :label="this.$t('cur_imc')" hint="" readonly />
                    <q-btn :color="this.infoIMC.color" :label="this.infoIMC.state" :icon="this.infoIMC.icon" />
                    <q-input filled v-model="size" :label="this.$t('cur_height')" hint="" readonly >
                      <q-tooltip>{{this.$t('info_height')}}</q-tooltip>
                    </q-input>
                    <q-input filled v-model="formDate">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-date v-model="formDate" mask="YYYY-MM-DD HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="formDate" mask="YYYY-MM-DD HH:mm" format24h>
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-btn color="green-13 " icon="check" v-on:click="validatefollowUpIMC" :disable="this.new_weight === ''"/>
                  </q-form>
                </q-card-section>
              </q-card>
              <q-tab-panels v-model="panel" v-if="weightWeekSelected" animated class="shadow-2 q-mt-md">
                <q-tab-panel name="week">
                    <div class="q-ml-md">
                      <h3>{{weightWeekSelected.date | formatTheDate }}</h3>
                      <h5>{{this.$t('label_details_weight')}}{{weightWeekSelected.weight}}</h5>
                      <h5>{{this.$t('label_detail_imc')}}{{weightWeekSelected.imc_computed}}</h5>
                    </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card-section>
        </q-expansion-item>
      </q-card>
      <!-- le deuxieme expansion item pour un autre suivi -->
      <q-card class="q-ml-md q-mr-md q-mt-md" v-show="otherFollowUp">
        <q-expansion-item
        expand-separator
        icon="shuffle"
        label="Follow-up je ne sais pas quoi">
        <q-card-section>
        </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>
<script>
import IconAndTitle from 'components/IconAndTitleHeader.vue'
import FacadeLineChartComponent from 'components/FacadeLineChartComponent.vue'
import ProgressIcone from 'components/ProgressIcon.vue'

import { axiosInstance } from 'boot/axios'
import { date } from 'quasar'

export default {
  name: 'followup_page',
  data () {
    return {
      intro: 'Follow Up Page',
      // maintenant
      today: new Date(),
      userToFollow: undefined,
      // données à charger differement
      id_user: 42,
      expanded_imc: true,
      charttest: undefined,
      otherFollowUp: false,
      // la taille sera à récupérer depuis la fiche de santé
      size: 1.80,
      objective: 70,
      // loseWeight est un booleen qui désigne le fait de vouloir perdre du poid, ou d'en gagner
      loseWeight: true,
      panel: '',
      addNewData: false,
      // il faudrait l'initialiser a la derniere valeur
      new_weight: '',
      watched: 0,
      formDate: '2019-02-01 12:44',
      newIMC: 0,
      // pour afficher des détails sur la valeur de l'imc avec des options d'UI
      infoIMC: {
        state: 'Normale',
        color: 'positive',
        icon: 'check'
      },
      weightWeekSelected: undefined,
      weightMonthSelected: undefined,
      weightSemestreSelected: undefined,
      weightYearSelected: undefined,
      loadedYear: false,
      loadedYearTwo: false,
      // ces variables ci dessous, pour stocker les données provenant de l'api
      lastWeekData: [],
      lastWeekDataIMC: [23.15, 23.46, 24.07, 22.84, 22.22, 21.91, 21.60],
      lastMonthData: [],
      lastTrimesterData: [],
      lastSemestersData: [],
      lastYearData: [],
      // dsf
      dataTabdeci: [75.4, 75.1, 74.8, 74.3, 75.1, 75.2, 75.1],
      lastData: [
        {
          date: '2021-04-030T15:01:09.538Z',
          weight: 75.1,
          imc: 0
        }
      ],
      // les données stocké differement et plusieurs fois ...
      weekTabObject: [],
      weekDataTabWeight: [],
      weekDataTabImc: [],
      monthTabObject: [],
      monthDataTabWeight: [],
      monthDataTabImc: [],
      semesterTabObject: [],
      semesterDataTabWeight: [],
      semesterDataTabImc: [],
      yearTabObject: [],
      yearDataTabWeight: [],
      yearDataTabImc: []
    }
  },
  components: {
    IconAndTitle,
    FacadeLineChartComponent,
    ProgressIcone
    // LineChart
  },
  watch: {
    new_weight: function () {
      this.watched = this.newIMC + 1
    }
  },
  computed: {
    imcComputation () {
      this.triggerIMC()
      let imcComputed = 0
      if (this.new_weight === '') {
        this.triggerIMC(imcComputed)
        return imcComputed
      } else {
        imcComputed = parseInt(this.new_weight) / (this.size * this.size)
      }
      this.triggerIMC(imcComputed)
      return imcComputed
    }
  },
  filters: {
    formatTheDate: function (dt) {
      dt = dt.replace('T', ' ')
      dt = dt.replace('Z', ' ')
      const finalDate = new Date(Date.parse(dt))
      const formatedDate = date.formatDate(finalDate, 'DD MMMM YYYY')
      return formatedDate
    }
  },
  methods: {
    // c'est pour afficher une icone differentes en focntion du calcul IMC
    triggerIMC (imc) {
      this.newIMC = imc
      if (imc === 0) {
        return null
      }
      if (imc >= 25 && imc < 30) {
        this.infoIMC.state = this.$t('button_imc_surpoids')
        this.infoIMC.color = 'warning'
        this.infoIMC.icon = 'warning'
      } else if (imc < 18.5 && imc >= 16.5) {
        this.infoIMC.state = this.$t('button_imc_maigreur')
        this.infoIMC.color = 'warning'
        this.infoIMC.icon = 'warning'
      } else if (imc < 16.5) {
        this.infoIMC.state = this.$t('button_imc_famine')
        this.infoIMC.color = 'red-9'
        this.infoIMC.icon = 'warning'
      } else if (imc >= 30) {
        this.infoIMC.state = this.$t('button_imc_obese')
        this.infoIMC.color = 'red-9'
        this.infoIMC.icon = 'warning'
      } else {
        this.infoIMC.state = this.$t('button_imc_normal')
        this.infoIMC.color = 'positive'
        this.infoIMC.icon = 'check'
      }
    },
    hasReachedObjective () {
      if (this.lastData.weight <= this.objective) {
        return true
      } else {
        return false
      }
    },
    sendNewFollowUpData (data) {
      // ici on post les nouvelles données
      axiosInstance.post('/followup/imc/', data)
        .then(elem => {
          this.$router.go()
        })
        .catch(function (error) {
          console.log(error)
          console.log('ERRRR:: ', error.response.data)
        })
    },
    getFollowUpData () {
      axiosInstance.get(`/followup/imc/${this.id_user}`).then(elem => {
        this.gotData = elem.data
      })
    },
    //, si j'utilise un async await, ce sera pour afficher une barre de chargement
    async getLastWeekData () {
      const ret = await axiosInstance.get(`/followup/imc/lastweek/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      this.weekTabObject = ret.data.reverse()
      let previousWeight = null

      this.weekTabObject.filter(elem => {
        this.weekDataTabWeight.push(elem.weight)
        this.weekDataTabImc.push(elem.imc_computed)
        if (previousWeight == null) {
          previousWeight = elem.weight
          elem.previousWeight = null
        } else {
          elem.previousWeight = previousWeight
          previousWeight = elem.weight
        }
      })
      this.lastWeekData = ret.data
    },
    async getLastMonthData () {
      const ret = await axiosInstance.get(`/followup/imc/lastmonth/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      this.monthTabObject = ret.data.reverse()
      let previousWeight = null

      this.monthTabObject.filter(elem => {
        this.monthDataTabWeight.push(elem.weight)
        this.monthDataTabImc.push(elem.imc_computed)
        if (previousWeight == null) {
          previousWeight = elem.weight
          elem.previousWeight = null
        } else {
          elem.previousWeight = previousWeight
          previousWeight = elem.weight
        }
      })
    },
    async getLastSemesterData () {
      const ret = await axiosInstance.get(`/followup/imc/lastsemester/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      this.semesterTabObject = ret.data.reverse()
      let previousWeight = null

      this.semesterTabObject.filter(elem => {
        this.semesterDataTabWeight.push(elem.weight)
        this.semesterDataTabImc.push(elem.imc_computed)
        if (previousWeight == null) {
          previousWeight = elem.weight
          elem.previousWeight = null
        } else {
          elem.previousWeight = previousWeight
          previousWeight = elem.weight
        }
      })
    },
    async getLastYearData () {
      const ret = await axiosInstance.get(`/followup/imc/lastyear/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      this.yearTabObject = ret.data.reverse()
      let previousWeight = null

      this.yearTabObject.filter(elem => {
        this.yearDataTabWeight.push(elem.weight)
        this.yearDataTabImc.push(elem.imc_computed)
        if (previousWeight == null) {
          previousWeight = elem.weight
          elem.previousWeight = null
        } else {
          elem.previousWeight = previousWeight
          previousWeight = elem.weight
        }
      })
    },
    async getLastData () {
      const ret = await axiosInstance.get(`/followup/imc/last/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      if (ret.data === null) {
        console.log('c\'est vide le last data')
      } else {
        this.lastData = ret.data
      }
    },
    validatefollowUpIMC () {
      // il y a un probleme entre le back et le front sur la timezone ...
      const dateToSet = new Date(this.formDate)
      const data = {
        id_user: this.id_user,
        imc: this.newIMC,
        weight: this.new_weight,
        date: dateToSet,
        day: dateToSet.getDay(),
        month: dateToSet.getMonth()
      }
      this.sendNewFollowUpData(data)
    },
    progression (elem) {
      if (elem.weight > elem.previousWeight) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.userToFollow = JSON.parse(localStorage.getItem('user'))
    this.id_user = this.userToFollow.id
    this.getFollowUpData()
    this.formDate = new Date()
    this.getLastWeekData()
    this.getLastMonthData()
    this.getLastSemesterData()
    this.getLastYearData()
    this.getLastData()
  }
}

</script>
