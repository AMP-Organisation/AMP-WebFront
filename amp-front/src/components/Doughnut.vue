<script>

import { Doughnut, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, {
      maintainAspectRatio: false
    })
  },
  watch: { chartData: { deep: true, handler () { this.renderChart(this.chartData, { maintainAspectRatio: false }) } } }
}
</script>
