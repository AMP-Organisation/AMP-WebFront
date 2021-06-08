<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    // le chartData nécessaire pour le line chart
    chartData: {
      type: Object
    },
    // le chartOption nécessaire pour le line chart
    options: {
      type: Object
    }
  },
  data () {
    return {
      // always necessary
      labelWeek: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche'
      ],
      key: 'value',
      datachrt: {},
      opt: {}
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
