<template lang="">
  <div>
    {{ intro }}
    <q-card>
      <q-card-section>
        <div class="mysmall">
          <LineChart
            :chartData="dataChart"
            :options="dataOption"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn label="DEBUG" :color="'amber-5'" v-on:click="debugFunction()"/>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import LineChart from 'components/LineChart.vue'
import { month, week } from 'boot/env_str'

export default {
  name: 'FacadeLineChartComponent',
  props: {
    duration: {
      type: Number
    },
    // si ce sont des jours ou des mois
    // et si c'est "custom", faut mettre "custom"
    durationType: {
      type: String,
      default: 'week',
      required: true
    },
    // on recoit la list des données reçu
    firstData: {
      type: Array,
      default: null
    },
    firstLabel: {
      type: String,
      default: 'first data'
    },
    secondData: {
      type: Array,
      default: null
    },
    secondLabel: {
      type: String,
      default: 'first data'
    },
    customTitle: {
      type: String,
      default: null
    },
    titleChart: {
      type: String,
      default: 'double line chart'
    }
  },
  components: {
    LineChart
  },
  data () {
    return {
      // la date maintenant
      today: new Date(),
      intro: 'component facade to use line chart',
      // et c'est bien mardi car le 0 c'est dimanche
      dayToday: 4,
      // c'est Mai pour le 4 car Janvier = 0
      monthToday: 2,
      yearToday: 2021,
      preLabels: [],
      toto: {},
      dataTestTab: [73.4, 75.1, 82.8, 74.3, 75.1, 76.2, 77.1],
      dataChart: {
        // le label de l'abscisse
        labels: [],
        datasets: [
          {
            label: this.firstLabel,
            // les données
            data: [],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)',
            yAxisID: 'y'
          },
          {
            label: this.secondLabel,
            // les données
            data: [22, 23, 24, 32, 23, 21, 20],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 255, 0, 255)',
            pointBackgroundColor: 'rgba(100, 25, 255, 1)',
            pointBorderColor: 'rgba(42, 42, 42, 1)',
            pointStyle: 'cross',
            yAxisID: 'y1'
          }
        ]
      },
      dataOption: {
        type: 'line',
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        title: {
          display: true,
          text: this.titleChart
        },
        scales: {
          yAxes: [{
            id: 'y',
            type: 'linear',
            display: true,
            position: 'left'
          }, {
            id: 'y1',
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: true // only want the grid lines for one axis to show up
            }
          }]
        }
      }
    }
  },
  methods: {
    debugFunction () {
      console.log('DEBUG')
      console.log(this.preLabels)
      console.log(this.firstData)
      console.log(this.secondData)
    },
    generateLabelForDuration (period) {
      for (let i = period + 1; i > 0; i--) {
        // const strDate = antes.toDateString()
        const temp = new Date(this.today)
        temp.setDate(temp.getDate() - i)
        this.preLabels.push(temp.toDateString())
        // antes = antes.setDate(antes.getDate() + 1)
      }
    },
    /**
    * This function generate the labels of the line chart
    * according to the duration given to the component
    */
    generateLabel () {
      if (this.durationType === 'week') {
        for (let i = 0; i < week.length; i++) {
          if (i + this.dayToday >= week.length) {
            this.preLabels.push(week[i - (7 - this.dayToday)])
          } else {
            this.preLabels.push(week[i + this.dayToday])
          }
        }
      } else if (this.durationType === 'month') {
        this.generateLabelForDuration(30)
      } else if (this.durationType === 'semester') {
        for (let i = 6; i < month.length; i++) {
          if (i + this.monthToday >= month.length) {
            this.preLabels.push(month[i - (12 - this.monthToday)])
          } else {
            this.preLabels.push(month[i + this.monthToday])
          }
        }
      } else if (this.durationType === 'year') {
        for (let i = 0; i < month.length; i++) {
          if (i + this.monthToday >= month.length) {
            this.preLabels.push(month[i - (12 - this.monthToday)])
          } else {
            this.preLabels.push(month[i + this.monthToday])
          }
        }
      } else if (this.durationType === 'custom') {
        // attention, duration n'est pas requis donc pb eventuel
        this.generateLabelForDuration(this.duration)
      }
      this.dataChart.labels = this.preLabels
    },
    // we have to, because if for the same day/month we have several data, we do a moyenne of the day
    generateData () {
      if (this.firstData === null) {
        // I dont change anything inside preLabels, it is just to create the same number of data
        this.preLabels.map(() => {
          this.dataChart.datasets[0].data.push(Math.round(Math.random() * 92))
        })
      } else {
        this.dataChart.datasets[0].data = this.firstData
      }
      if (this.secondData === null) {
        // I dont change anything inside preLabels, it is just to create the same number of data
        this.preLabels.map(() => {
          this.dataChart.datasets[1].data.push(Math.round(Math.random() * 25))
        })
      } else {
        this.dataChart.datasets[1].data = this.secondData
      }
    },
    loadData () {
      this.dayToday = this.today.getDay()
      this.monthToday = this.today.getMonth()
    },
    checkOtherCustomProps () {
      if (this.customTitle != null) {
        this.dataOption.title.text = this.customTitle
      }
    }
  },
  created () {
    this.loadData()
    this.generateLabel()
    this.generateData()
    this.checkOtherCustomProps()
  }
}
</script>

<style>
  /* ne serait-ce pas mieux que ce soit une autre unité que le pixel ?
  mais je ne les connais pas toute ^^ */
  .mysmall {
    max-height: 700px;
  }
</style>
