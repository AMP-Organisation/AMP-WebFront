<template lang="">
  <div>
    <IconAndTitle :title="'option 2'"/>
    <div>
      <IconAndTitle/>
      <IconAndTitle :color="'amber-9 '"/>
      <IconAndTitle :icon="'sick'" :color="'deep-orange-13'"/>
      <IconAndTitle :icon="'power'" :color="'brown-6 '" :title="'titre choisi'"/>
    </div>
  </div>
</template>
<script>
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'option_two',
  data () {
    return {
      intro: 'page de l\'option 2'
    }
  },
  components: {
    IconAndTitle
  },
  created () {
    console.log('dans option 2')
  }
}
</script>
