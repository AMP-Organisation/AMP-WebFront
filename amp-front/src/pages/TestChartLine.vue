<template lang="">
  <div>
    <!-- Cette page pourra etre supprimé non ? -->
    <IconAndTitle :title="intro" :color="'teal-4'" :icon="'add'" />
    <FacadeLineChartComponent :durationType="'week'"/>
    <FacadeLineChartComponent :durationType="'semester'" :customTitle="'par semestre'"/>
    <FacadeLineChartComponent :durationType="'year'" :customTitle="'par année'"/>
    <FacadeLineChartComponent :durationType="'month'" :customTitle="'par mois'"/>
    <FacadeLineChartComponent :durationType="'custom'" :duration="14" :customTitle="'14 jours'"/>
    <FacadeLineChartComponent :durationType="'custom'" :duration="31" :customTitle="'14 jours'"/>
    <FacadeLineChartComponent :durationType="'custom'" :duration="42" :customTitle="'14 jours'"/>
    <FacadeLineChartComponent :durationType="'custom'" :duration="100" :customTitle="'14 jours'"/>
  </div>
</template>
<script>
import IconAndTitle from 'components/IconAndTitleHeader.vue'
import FacadeLineChartComponent from 'components/FacadeLineChartComponent.vue'

export default {
  name: 'page_de_test_line_chart',
  data () {
    return {
      intro: 'bonjour ceci est la page de test de al facade du line chart'
    }
  },
  components: {
    IconAndTitle,
    FacadeLineChartComponent
  }
}
</script>
