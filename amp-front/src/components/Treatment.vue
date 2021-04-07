<template lang="">
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">sous titre</div>
      </q-card-section>

      <q-card-actions vertical align="right">
        <p class="text-body1">{{ description }}</p>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'Treatment',
  props: {
    name: {
      type: String,
      default: 'un nom par defaut'
    },
    description: {
      type: String,
      default: 'ue description par defaut et si c\'est par defaut c\'est qu\'il y a eu un probleme'
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log('composant traitement créé')
  }
}
</script>
