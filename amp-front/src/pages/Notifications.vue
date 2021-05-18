<template>
  <div>
    <IconAndTitle :title="this.$t('notification_title')" :icon="'notifications'"/>
    <q-toggle
      :label="`Activer les notifications windows de suivi`"
      v-model="activateNotification"
      @input="persistent_notification = true"
    />
    <q-dialog v-model="persistent_notification" v-if="activateNotification" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Demande de validation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          En activant cette notification, vous acceptez de recevoir tout les jours à 12h00 des rappel sur vos pilluliers actif ?
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="Non" v-close-popup @click="activateNotification = false" />
          <q-btn flat label="Oui" v-close-popup @click="enableNotification" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'notifications_page',
  data () {
    return {
      intro: 'page des notifications de l\'utilisateur',
      activateNotification: false,
      persistent_notification: false
    }
  },
  components: {
    IconAndTitle
  },
  created () {
    console.log('page créé')
  },
  methods: {
    enableNotification (value) {
      this.$emit('activateNotification', value)
    }
  }
}
</script>
