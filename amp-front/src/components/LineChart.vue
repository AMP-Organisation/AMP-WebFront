<script>

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    },
    chartColors: {
      type: Object
    }
  },
  mounted () {
    const noms = this.chartData.map(d => d.nom).reverse()
    const deces = this.chartData.map(d => d.deces).reverse()
    const gueris = this.chartData.map(d => d.gueris).reverse()
    const hospitalises = this.chartData.map(d => d.hospitalises).reverse()
    const reanimation = this.chartData.map(d => d.reanimation).reverse()
    console.log(this.chartData)
    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor
    } = this.chartColors
    this.renderChart(
      {
        labels: noms,
        datasets: [
          {
            label: 'Deces',
            data: deces,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          },
          {
            label: 'Gueris',
            data: gueris,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          },
          {
            label: 'Hospitalisés',
            data: hospitalises,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          },
          {
            label: 'Réanimations',
            data: reanimation,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          }
        ]
      },
      this.options
    )
  }
}
</script>
