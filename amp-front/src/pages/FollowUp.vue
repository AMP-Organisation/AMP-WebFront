<template>
  <div>
    <IconAndTitle :title="intro" :color="'teal-4'" :icon="'moving'" />
    <div class=" q-pb-xl">
      <q-card class="q-ml-md q-mr-md q-mb-md">
        <q-expansion-item
        expand-separator
        v-model="expanded_imc"
        icon="monitor_weight"
        label="Follow-up IMC"
        :expand-icon-class="'text-teal-4'"
        :header-class="'text-h5'"
        >
        <!-- premiere partie de la carte avec le titre et l'objectif de poid -->
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="col-1">
                <div v-if="hasReachedObjective()">
                  <div class="text-h3 text-red-9" color="red-9">
                    {{ objective }}
                  </div>
                </div>
                <div v-else>
                  <div class="text-h3 text-teal-9" color="teal-9">
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
            <q-tab-panel name="week">
              <LineChart
                v-if="datatab"
                :chartData="dataChartWeek"
                :options="dataOption"
                :which="true"
                :duration="'week'"
                :dataToCompute="dataTabdeci"
              />
            </q-tab-panel>
            <q-tab-panel name="month">
              <LineChart
                v-if="datatab"
                :chartData="dataChartMonth"
                :options="dataOption"
                :which="true"
                :duration="'month'"
                :dataToCompute="dataTabdeci"
              />
            </q-tab-panel>
            <q-tab-panel name="year">
              <FacadeLineChartComponent :duration="7" >
              </FacadeLineChartComponent>
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
                        { label: 'Week', value: 'week' },
                        { label: 'Month', value: 'month' },
                        { label: 'Semester', value: 'semester' },
                        { label: 'Year', value: 'year' }
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
              <!-- <q-card class="q-ml-md q-mr-md">
                <p>bonjour</p>
              </q-card> -->
                <div class="q-pa-md">
                  <div class="" >
                    <q-option-group
                      v-model="panel"
                      inline
                      :options="[
                        { label: 'Week', value: 'week' },
                        { label: 'Month', value: 'month' },
                        { label: 'Semester', value: 'semester' },
                        { label: 'Year', value: 'year' }
                      ]"
                    />
                    <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
                      <!-- par semaine -->
                      <q-tab-panel name="week">
                        <div class="text-h5 q-mb-sm">
                          Week
                        </div>
                        <q-list
                          bordered
                          separator
                          v-for="wdata in weekData"
                          v-bind:key="wdata.date">
                          <q-item clickable v-ripple>
                            <q-item-section class="col-1">
                              <div v-if="loseWeight">
                                <q-icon v-if="progression(wdata.date)" name="south_east" :size="'xl'" :color="'teal-9'">
                                  <q-tooltip>You lost some weight</q-tooltip>
                                </q-icon>
                                <q-icon v-else name="north_east" :size="'xl'" :color="'red-9'">
                                  <q-tooltip>You gain some weight</q-tooltip>
                                </q-icon>
                              </div>
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
                            v-for="elemData in monthData"
                            v-bind:key="elemData.date">
                            <q-item clickable v-ripple>
                              <q-item-section class="col-1">
                                <div v-if="loseWeight">
                                  <q-icon v-if="progression(elemData.date)" name="south_east" :size="'xl'" :color="'teal-9'">
                                    <q-tooltip>You lost some weight</q-tooltip>
                                  </q-icon>
                                  <q-icon v-else name="north_east" :size="'xl'" :color="'red-9'">
                                    <q-tooltip>You gain some weight</q-tooltip>
                                  </q-icon>
                                </div>
                              </q-item-section>
                              <q-item-section class="col">
                                <q-item-label>Le : {{ elemData.date | formatTheDate }}</q-item-label>
                                <q-item-label>Poids de : {{ elemData.weight }} </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                      </q-tab-panel>
                      <!-- par semestre (enfin je ne sais pas si on le gardera celui ci) -->
                      <q-tab-panel name="semester">
                        <div class="text-h6">Month</div>
                        <q-list
                            bordered
                            separator
                            v-for="elemData in gotData"
                            v-bind:key="elemData.date">
                            <q-item clickable v-ripple>
                              <q-item-section class="col-1">
                                <div v-if="loseWeight">
                                  <q-icon v-if="progression(elemData.date)" name="south_east" :size="'xl'" :color="'teal-9'">
                                    <q-tooltip>You lost some weight</q-tooltip>
                                  </q-icon>
                                  <q-icon v-else name="north_east" :size="'xl'" :color="'red-9'">
                                    <q-tooltip>You gain some weight</q-tooltip>
                                  </q-icon>
                                </div>
                              </q-item-section>
                              <q-item-section class="col">
                                <q-item-label>Le : {{ elemData.date | formatTheDate }}</q-item-label>
                                <q-item-label>Poids de : {{ elemData.weight }} </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-tab-panel>
                      <q-tab-panel name="year">
                        <div class="text-h6">Movies</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>
            </div>
            <!-- la liste -->
            <div class="col-6">
              <q-btn
                color="positive"
                icon="add"
                v-on:click="addNewData = !addNewData"
                v-if="!addNewData"
              />
              <q-btn
                color="amber-8"
                icon="cancel"
                v-on:click="addNewData = !addNewData"
                v-if="addNewData"
              />
              <!-- <q-list
                bordered
                separator
                v-for="wdata in weekData"
                v-bind:key="wdata.date">
                <q-item clickable v-ripple>
                  <q-item-section class="col-1">
                    <div v-if="loseWeight">
                      <q-icon v-if="progression(wdata.date)" name="south_east" :size="'xl'" :color="'teal-9'">
                        <q-tooltip>You lost some weight</q-tooltip>
                      </q-icon>
                      <q-icon v-else name="north_east" :size="'xl'" :color="'red-9'">
                        <q-tooltip>You gain some weight</q-tooltip>
                      </q-icon>
                    </div>
                  </q-item-section>
                  <q-item-section class="col">
                    <q-item-label>Le : {{ wdata.date | formatTheDate }}</q-item-label>
                    <q-item-label>Poids de : {{ wdata.weight }} </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list> -->
              <q-card class="q-mt-md" v-if="addNewData">
                <q-card-section>
                  <div class="text-h5">add new data</div>
                </q-card-section>
                <q-separator/>
                <q-card-section>
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                  >
                    <q-input filled v-model="new_weight" label="Your current weight" hint="in kg" />
                    <q-input filled v-model="imcComputation" label="Your IMC" hint="" readonly />
                    <q-btn :color="this.infoIMC.color" :label="this.infoIMC.state" :icon="this.infoIMC.icon" v-on:click="validatefollowUpIMC" />
                    <q-input filled v-model="size" label="Your size in m" hint="" readonly />
                    <q-input filled v-model="watched" label="test watch" hint="" readonly />
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
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <p>toto</p>
          </div>
        </q-card-section>
        </q-expansion-item>
      </q-card>
      <!-- le deuxieme expansion item pour un autre suivi -->
      <q-card class="q-ml-md q-mr-md q-mt-md">
        <q-expansion-item
        expand-separator
        icon="shuffle"
        label="Follow-up je ne sais pas quoi">
        <q-card-section>
          <q-label>
            toto
          </q-label>
        </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>
<script>
// import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'
import LineChart from 'components/LineChart.vue'
import FacadeLineChartComponent from 'components/FacadeLineChartComponent.vue'

import { axiosInstance } from 'boot/axios'
import { month, week } from 'boot/env_str'
import { date } from 'quasar'

export default {
  name: 'followup_page',
  data () {
    return {
      intro: 'Follow Up Page',
      // données à charger differement
      id_user: 12,
      expanded_imc: true,
      charttest: undefined,
      // la taille sera à récupérer depuis la fiche de santé
      size: 1.80,
      objective: 70,
      // loseWeight est un booleen qui désigne le fait de vouloir perdre du poid, ou d'en gagner
      loseWeight: true,
      panel: 'year',
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
      // ces 3 variables, pour stocker les données provenant de l'api
      lastWeekData: [],
      lastMonthData: [],
      lastYearData: [],
      dataTabdeci: [75.4, 75.1, 74.8, 74.3, 75.1, 75.2, 75.1],
      lastData: [
        {
          date: '2021-04-030T15:01:09.538Z',
          weight: 75.1,
          imc: 0
        }
      ],
      weekData: [
        {
          date: '2021-04-030T15:01:09.538Z',
          weight: 75.1,
          imc: 0
        },
        {
          date: '2021-04-029T15:01:09.538Z',
          weight: 75.2,
          imc: 0
        },
        {
          date: '2021-04-028T15:01:09.538Z',
          weight: 75.1,
          imc: 0
        },
        {
          date: '2021-04-027T15:01:09.538Z',
          weight: 74.3,
          imc: 0
        },
        {
          date: '2021-04-026T15:01:09.538Z',
          weight: 74.8,
          imc: 0
        },
        {
          date: '2021-04-025T15:01:09.538Z',
          weight: 75.1,
          imc: 0
        },
        {
          date: '2021-04-024T15:01:09.538Z',
          weight: 75.4,
          imc: 0
        }
      ],
      monthData: [
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-08T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-07T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-06T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-05T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-04T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-03T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-02T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-01T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-01-31T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-30T15:01:09.538Z',
          weight: 75,
          imc: 0
        },
        {
          date: '2021-02-29T15:01:09.538Z',
          weight: 75,
          imc: 0
        }
      ],
      gotData: [],
      dataOption: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data bis'
        }
      },
      datatab: [],
      dataChartWeek: {
        labels: [
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche'
        ],
        datasets: [
          {
            label: 'Data 1',
            data: [42, 36, 76, 42, 36, 76, 42, 36, 76, 42, 36, 76],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          }
        ]
      },
      dataChartMonth: {
        labels: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
        datasets: [
          {
            label: 'Data 1',
            data: [42, 36, 76, 42, 36, 76, 42, 36, 76, 42, 36, 76],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          }
        ]
      }
    }
  },
  components: {
    IconAndTitle,
    FacadeLineChartComponent,
    LineChart
  },
  watch: {
    new_weight: function () {
      console.log('mise a jour du poids')
      console.log(this.newIMC)
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
      console.log(`le jour : ${date.formatDate(finalDate, 'dddd')}`)
      return formatedDate
    }
  },
  methods: {
    triggerIMC (imc) {
      console.log('triggered !!')
      this.newIMC = imc
      if (imc === 0) {
        return null
      }
      if (imc >= 25 && imc < 30) {
        this.infoIMC.state = 'Surpoids'
        this.infoIMC.color = 'warning'
        this.infoIMC.icon = 'warning'
      } else if (imc < 18.5 && imc >= 16.5) {
        this.infoIMC.state = 'Maigreur'
        this.infoIMC.color = 'warning'
        this.infoIMC.icon = 'warning'
      } else if (imc < 16.5) {
        this.infoIMC.state = 'Famine'
        this.infoIMC.color = 'red-9'
        this.infoIMC.icon = 'warning'
      } else if (imc >= 30) {
        this.infoIMC.state = 'Obésité'
        this.infoIMC.color = 'red-9'
        this.infoIMC.icon = 'warning'
      } else {
        this.infoIMC.state = 'Normale'
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
        console.log('les données reçu ')
        console.log(elem.data)
        this.gotData = elem.data
      })
    },
    // si j'utilise un async await, ce sera pour afficher une barre de chargement
    async getLastWeekData () {
      const ret = await axiosInstance.get(`/followup/imc/lastweek/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      console.log('les données reçu pour le last week')
      console.log(ret.data)
      this.lastWeekData = ret.data
    },
    async getLastMonthData () {
      const ret = await axiosInstance.get(`/followup/imc/lastmonth/${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      console.log('les données reçu pour le last week')
      console.log(ret.data)
      this.lastWeekData = ret.data
    },
    async getLastYearData () {
      const ret = await axiosInstance.get(`/followup/imc/lastyear${this.id_user}`).catch(function (error) {
        console.log(error)
        console.log('ERRRR:: ', error.response.data)
      })
      console.log('les données reçu pour le last week')
      console.log(ret.data)
      this.lastWeekData = ret.data
    },
    validatefollowUpIMC () {
      console.log('we are going to validate new data')
      console.log(this.newIMC)
      console.log(this.new_weight)
      console.log(this.formDate)
      const data = {
        id_user: this.id_user,
        imc: this.newIMC,
        weight: this.new_weight,
        date: new Date(this.formDate)
      }
      this.sendNewFollowUpData(data)
    },
    progression () {
      return true
    }
  },
  created () {
    console.log('dans la page follow up')
    this.getFollowUpData()
    this.formDate = new Date()
    console.log(this.dataChart)
    this.weekData.filter(elem => {
      this.datatab.push(elem.weight)
    })
    console.log(this.datatab)
    // this.dataChart.datasets[0].label = 'Toto'
    // this.dataChart.datasets[0].data = this.datatab
    console.log(this.dataChart)
    console.log(month)
    console.log(week)
    this.getLastWeekData()
    console.log('**FIN du created**')
  }
}

</script>
