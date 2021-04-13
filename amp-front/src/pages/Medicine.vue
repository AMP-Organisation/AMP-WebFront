<template lang="">
    <div>
        {{ intro }}
        <q-list bordered separator>
              <q-item
              v-for="med in medicinePages"
              v-bind:key="med.id"
              v-on:click="medicine_selected = med"
              class="q-my-sm"
              clickable
              v-ripple
              >
              <q-item-section>
                <div>toto</div>
                <!-- <q-item-label>{{ printDiseaseListTitle(dis) }}</q-item-label>
                <q-item-label caption>{{
                  printDiseaseListDescription(dis)
                }}</q-item-label> -->
              </q-item-section>
              </q-item>
            </q-list>
    </div>
</template>
<script>
export default {
  name: 'medicine_page',
  data () {
    return {
      intro: 'la page de medicament'
    }
  },
  created () {
    console.log('medicine page created')
  }
}
</script>
<style lang="">
</style>
