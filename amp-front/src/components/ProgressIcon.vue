<template>
  <div>
    <q-icon v-if="toPrint == 0" name="flag" :size="'xl'" :color="'teal-9'">
      <q-tooltip>You lost some weight</q-tooltip>
    </q-icon>
    <q-icon v-if="toPrint == 1" name="south_east" :size="'xl'" :color="'teal-9'">
      <q-tooltip>You lost some weight</q-tooltip>
    </q-icon>
    <q-icon v-if="toPrint == 2" name="north_east" :size="'xl'" :color="'red-9'">
      <q-tooltip>You lost some weight</q-tooltip>
    </q-icon>
    <q-icon v-if="toPrint == 3" name="reorder" :size="'xl'" :color="'teal-9'">
      <q-tooltip>You lost some weight</q-tooltip>
    </q-icon>
  </div>
</template>
<script>
// Ce composant sert pour la petite cone de progression
// mais ca ne marche que dans la liste ...
export default {
  name: 'ProgressIcone',
  props: {
    dataComponent: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      intro: 'composant pour l\'icone de proigresion de l\'imc',
      toPrint: 0
    }
  },
  created () {
    if (this.dataComponent.previousWeight == null) {
      this.toPrint = 0
    } else if (this.dataComponent.previousWeight > this.dataComponent.weight) {
      this.toPrint = 1
    } else if (this.dataComponent.previousWeight < this.dataComponent.weight) {
      this.toPrint = 2
    } else {
      this.toPrint = 3
    }
  }
}
</script>
