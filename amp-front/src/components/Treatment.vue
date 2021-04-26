<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle2">sous titre</div>
        <div>début du traitement :{{ dateBegin | formatTheDate }}</div>
        <div v-if="dateEnd != null">{{ dateEnd | formatTheDate }}</div>
        <div v-else>traitement en cours</div>
      </q-card-section>
      <q-card-section class="q-mt-md q-mb-md">
        <Medicine
        class="q-mt-md q-mb-md"
        v-for="med in medicineLst"
        v-bind:key="med.nom"
        :name="med.name"
        :description="med.description">
        </Medicine>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>
      <q-separator inset />
      <q-card-actions vertical align="right">
        <p class="text-body1">{{ description }}</p>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import Medicine from 'src/components/Medicine.vue'
import { date } from 'quasar'

export default {
  name: 'Treatment',
  components: {
    Medicine
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
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
      const formattedString = date.formatDate(dt, 'DD MMMM YYYY')
      return formattedString
    }
  },
  data () {
    return {
      // j'ai mis comme ca, car, je pense qu'on recuperera les medicament lié depuis un requete depuis ce composant
      medicineLst: [
        {
          name: 'medicine One',
          description: 'la description de la medicine one'
        },
        {
          name: 'medicine two',
          description: 'la description de la medicine two'
        }
      ]
    }
  },
  created () {
    /**
    * for futur improvment
    if (this.dateEnd == null) {
      } else {
    }
    */
  }
}
</script>
