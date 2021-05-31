<template lang="">
  <div>
    <IconAndTitle :title="intro" :color="'teal-4'" :icon="'add'" />
    <FacadeLineChartComponent :durationType="'week'"/>
    <FacadeLineChartComponent :durationType="'semester'" :customTitle="'par semestre'"/>
    <FacadeLineChartComponent :durationType="'custom'" :duration="14" :customTitle="'14 jours'"/>
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
  },
  created () {
    console.log('creation TEST line chart')
  }
}
</script>
