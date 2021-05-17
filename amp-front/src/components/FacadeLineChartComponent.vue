<template lang="">
  <div>
    {{ intro }}
    <q-card>
      <q-section>
        <LineChart
          :chartData="dataChart"
          :options="dataOption"
          :which="true"
        />
      </q-section>
    </q-card>
  </div>
</template>
<script>
import LineChart from 'components/LineChart.vue'
import { month } from 'boot/env_str'

export default {
  name: 'FacadeLineChartComponent',
  props: {
    today: {
      type: Date,
      default: new Date()
    },
    duration: {
      type: Number
    },
    // on recoit la list des données reçu
    data: {
      type: Array[Object],
      default: []
    }
  },
  components: {
    LineChart
  },
  data () {
    return {
      intro: 'component facade to use line chart',
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
  created () {
    console.log('création de la facade')
    console.log(month)
    console.log(this.duration)
    console.log(this.data)
    console.log('fin creation de la facade pour le line chart')
  }
}
</script>
