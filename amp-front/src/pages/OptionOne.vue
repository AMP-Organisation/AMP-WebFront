<template lang="">
  <div>
    <h3>{{ intro }}</h3>
    <div class="q-mr-xl q-ml-xl q-mb-md">
      <Treatment class="q-mb-md" v-for="tre in  traitement" :key="tre.nom" :name='tre.nom' :description="tre.description" ></Treatment>
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
          description: 'une description au premier'
        },
        {
          nom: 'deux',
          description: 'une description au second'
        }
      ]
    }
  },
  created () {
    this.dt = new Date()
    console.log('opetion un créé')
    console.log(this.dt)
    const formatedDate = date.formatDate(this.dt, 'DD MMMM YYYY  HH:mm')
    console.log(formatedDate)
  }
}
</script>
