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
                :chartData="dataChart"
                :options="dataOption"
                :which="true"
                :duration="'week'"
                :dataToCompute="dataTabdeci"
              />
            </q-tab-panel>
            <q-tab-panel name="month">
              <LineChart
                v-if="datatab"
                :chartData="dataChart"
                :options="dataOption"
                :which="true"
                :duration="'week'"
                :dataToCompute="dataTabdeci"
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
                        <div class="text-h6">Movies</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  <q-input
                    filled
                    v-model="currentWeight"
                    label="Your current weight"
                    hint="in kg"
                  />
                  <q-input
                    filled
                    v-model="currentWeight"
                    label="Your current weight"
                    hint="in kg"
                  />
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
import { date } from 'quasar'

export default {
  name: 'followup_page',
  data () {
    return {
      intro: 'Follow Up Page',
      expanded_imc: true,
      test: {
        toto: 'titi'
      },
      charttest: undefined,
      size: 1.80,
      objective: 70,
      // loseWeight est un booleen qui désigne le fait de vouloir perdre du poid, ou d'en gagner
      loseWeight: true,
      panel: 'month',
      addNewData: false,
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
      dataOption: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data bis'
        }
      },
      datatab: [],
      dataChart: {
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
      }
    }
  },
  components: {
    IconAndTitle,
    LineChart
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
    hasReachedObjective () {
      if (this.lastData.weight <= this.objective) {
        return true
      } else {
        return false
      }
    },
    progression () {
      return true
    }
  },
  created () {
    console.log('dans la page follow up')
    console.log(this.dataChart)
    this.weekData.filter(elem => {
      this.datatab.push(elem.weight)
    })
    console.log(this.datatab)
    // this.dataChart.datasets[0].label = 'Toto'
    // this.dataChart.datasets[0].data = this.datatab
    console.log(this.dataChart)
  }
}

</script>
