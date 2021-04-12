<template lang="">
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">sous titre</div>
        <div>début du traitement :{{ dateBegin | formatTheDate }}</div>
        <div v-if="dateEnd != null">{{ dateEnd | formatTheDate }}</div>
        <div v-else>traitement en cours</div>
      </q-card-section>

      <q-card-actions vertical align="right">
        <p class="text-body1">{{ description }}</p>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { date } from 'quasar'
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
    },
    dateBegin: {
      type: Date,
      default: new Date()
    },
    dateEnd: {
      type: Date,
      default: null
    }
  },
  filters: {
    formatTheDate: function (dt) {
      console.log(`je formate : ${dt}`)
      const formattedString = date.formatDate(dt, 'YY-MMMM-DD')
      return formattedString
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log('composant traitement créé')
    console.log(`la date : ${this.dateBegin}`)
    if (this.dateEnd == null) {
      console.log('c\'est bien null')
    } else {
      console.log('il y a bien une date de fin')
    }
  }
}
</script>
