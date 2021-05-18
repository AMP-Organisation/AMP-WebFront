<template lang="">
  <div>
    {{ intro }}
    <q-card>
      <q-card-section>
        <LineChart
          :chartData="dataChart"
          :options="dataOption"
          :which="true"
        />
      </q-card-section>
      <q-card-section>
        <q-btn :icon="'check'" :color="'amber-5'" v-on:click="totoFunction()"/>
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
    today: {
      type: Date,
      default: undefined
    },
    duration: {
      type: Number
    },
    // si ce sont des jours ou des mois
    durationType: {
      type: String,
      default: 'week'
    },
    // on recoit la list des données reçu
    dataForChart: {
      type: Array
    }
  },
  components: {
    LineChart
  },
  data () {
    return {
      intro: 'component facade to use line chart',
      // et c'est bien mardi car le 0 c'est dimanche
      dayToday: 2,
      // c'est Mai pour le 4 car Janvier = 0
      monthToday: 4,
      yearToday: 2021,
      preLabels: [],
      dataChart: {
        // le label de l'abscisse
        labels: [],
        datasets: [
          {
            label: 'Data 1',
            // les données
            data: [],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          }
        ]
      },
      dataOption: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data bis'
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
        console.log('***FIN du for***')
      } else if (this.durationType === 'month') {
        console.log('c\'est en mois qu\'on genere ')
      }
    }
  },
  created () {
    console.log('création de la facade')
    console.log(month)
    console.log(week)
    console.log(this.duration)
    console.log(this.data)
    this.generateLabel()
    console.log('fin creation de la facade pour le line chart')
  }
}
</script>
