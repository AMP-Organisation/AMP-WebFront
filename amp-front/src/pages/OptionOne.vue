<template lang="">
  <div>
    <h3>{{ intro }}</h3>
    <div class="q-mr-xl q-ml-xl q-mb-md">
      <Treatment class="q-mb-md" v-for="tre in  traitement"
      :key="tre.nom"
      :name='tre.nom'
      :description="tre.description"
      :dateBegin="tre.dateBegin"/>
    </div>
  </div>
</template>
<script>
import Treatment from 'src/components/Treatment.vue'
import { date } from 'quasar'

export default {
  name: 'option_one',
  components: {
    Treatment
  },
  data () {
    return {
      intro: 'page de l\'option 1',
      dt: undefined,
      traitement: [
        {
          nom: 'un nom',
          description: 'une description au premier',
          dateBegin: new Date(),
          dateEnd: undefined
        },
        {
          nom: 'deux',
          description: 'une description au second',
          dateBegin: new Date(),
          dateEnd: undefined
        },
        {
          nom: 'un traitement fini',
          description: 'une description du traitement terminé',
          dateBegin: new Date(2017, 2, 7),
          dateEnd: new Date(2018, 2, 7)
        }
      ]
    }
  },
  created () {
    this.dt = new Date()
    console.log('option un créé')
    console.log(this.dt)
    const formatedDate = date.formatDate(this.dt, 'DD MMMM YYYY  HH:mm')
    console.log(formatedDate)
    console.log(this.traitement)
  }
}
</script>
