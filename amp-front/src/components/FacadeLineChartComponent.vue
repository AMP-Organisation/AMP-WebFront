<template lang="">
  <div>
    {{ intro }}
    <q-card>
      <q-card-section>
        <LineChart
          :chartData="dataChart"
          :options="dataOption"
          :which="true"
          :duration="'week'"
          :dataToCompute="dataTestTab"
        />
      </q-card-section>
      <q-card-section>
        <q-btn label="DEBUG" :color="'amber-5'" v-on:click="totoFunction()"/>
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
    durationType: {
      type: String,
      default: 'week'
    },
    // on recoit la list des données reçu
    dataToCompute: {
      type: Array
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
            label: 'Donnée de la facade',
            // les données
            data: [],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          },
          {
            label: 'Donnée bis',
            // les données
            data: [22, 23, 24, 32, 23, 21, 20],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 255, 0, 255)',
            pointBackgroundColor: 'rgba(100, 25, 255, 1)',
            pointBorderColor: 'rgba(42, 42, 42, 1)',
            pointStyle: 'cross'
          }
        ]
      },
      dataOption: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'my double line chart'
        },
        scales: {
          y: {
            display: true,
            position: 'left'
          },
          y1: {
            display: true,
            position: 'right'
          }
        }
      }
    }
  },
  methods: {
    totoFunction () {
      console.log('salut')
      console.log(this.preLabels)
    },
    generateLabel () {
      console.log('generate label')
      if (this.durationType === 'week') {
        console.log('c\'est en semaine qu\'on genere ')
        console.log(week.length)
        console.log(week)
        for (let i = 0; i < week.length; i++) {
          console.log(week[i])
          if (i + this.dayToday >= week.length) {
            console.log('if')
            console.log(week[i - (7 - this.dayToday)])
            this.preLabels.push(week[i - (7 - this.dayToday)])
          } else {
            console.log('else')
            console.log(this.dayToday)
            console.log(week[i + this.dayToday])
            this.preLabels.push(week[i + this.dayToday])
          }
        }
        this.dataChart.labels = this.preLabels
        console.log('***FIN du for***')
      } else if (this.durationType === 'month') {
        console.log('c\'est en mois qu\'on genere ')
      } else if (this.durationType === 'year') {
        console.log('c\'est en semestre qu\'on genere ')
        console.log(month.length)
        console.log(month)
        for (let i = 0; i < month.length; i++) {
          if (i + this.monthToday >= month.length) {
            console.log('if')
            console.log(month[i - (12 - this.monthToday)])
            this.preLabels.push(month[i - (12 - this.monthToday)])
          } else {
            console.log('else')
            console.log(this.monthToday)
            console.log(month[i + this.monthToday])
            this.preLabels.push(month[i + this.monthToday])
          }
        }
        this.dataChart.labels = this.preLabels
        console.log('***FIN du for year***')
      }
    },
    // we have to, because if for the same day/month we have several data, we do a moyenne of the day
    generateData () {
      this.dataChart.datasets[0].data = this.dataTestTab
    },
    loadData () {
      this.dayToday = this.today.getDay()
      this.monthToday = this.today.getMonth()
    }
  },
  created () {
    console.log('création de la facade')
    console.log(month)
    console.log(week)
    console.log(this.duration)
    console.log(this.data)
    console.log(this.dataToCompute)
    console.log('-la date-')
    console.log(this.today)
    console.log(this.today.getDay())
    console.log(this.today.getMonth())
    this.loadData()
    this.generateLabel()
    this.generateData()
    console.log('fin creation de la facade pour le line chart')
  }
}
</script>
