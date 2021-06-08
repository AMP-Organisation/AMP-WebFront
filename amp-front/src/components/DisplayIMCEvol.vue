<template>
  <div>
    {{ intro }}
    <q-card>
      <q-card-section>
        <div>current weight {{ weight }}</div>
        <div>previous weight {{ previous_weight }}</div>
        <div>is goal to loose weight {{ loose_weight }}</div>

      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'display_evolution_imc_component',
  data () {
    return {
      intro: 'le composant pour evol de l\'imc'
    }
  },
  props: {
    weight: {
      type: Number
    },
    previous_weight: {
      type: Number
    },
    loose_weight: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    doSomething () {
    }
  }
}
</script>
