
<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object
    },
    options: {
      type: Object
    },
    which: {
      type: Boolean,
      default: false
    },
    duration: {
      type: String,
      default: 'week'
    },
    dataToCompute: {
      type: Array
    }
  },
  data () {
    return {
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
      opt: {},
      dataChartRaw: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Poids',
            data: [2, 10, 5, 9, 0, 6, 20],
            fill: true,
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(255, 0, 255, 1)',
            scales: {
              y: {
                suggestedMin: 50,
                suggestedMax: 110
              }
            }
          }
        ]
      },
      optionRaw: {
        reverse: true,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data'
        },
        scales: {
          y: {
            suggestedMin: 50,
            suggestedMax: 110
          }
        }
      }
    }
  },
  mounted () {
    console.log('le mounted du line chart ')
    console.log(this.chartData)
    console.log(this.dataChartRaw)
    console.log(this.options)
    console.log(this.optionRaw)
    this.datachrt = this.chartData
    this.opt = this.options
    console.log(this.datachrt)
    if (this.which && this.duration === 'week') {
      console.log('option 1')
      this.dataChartRaw.labels = this.labelWeek
      this.dataChartRaw.datasets[0].data = this.dataToCompute
      // this.dataChartRaw.labels = 'custom char line'
      console.log(this.dataChartRaw)
      this.renderChart(this.dataChartRaw, this.optionRaw)
    } else if (this.which) {
      console.log('option 2')
      this.renderChart(this.datachrt, this.opt)
    } else {
      console.log('option 3')
      this.renderChart(this.dataChartRaw, this.optionRaw)
    }
  }
}
</script>
