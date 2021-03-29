<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs-md">
      <div class="col-lg-12 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs-md">
              <div class="text-overline">{{ this.place.address }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ this.place.region }}, {{ this.place.department }}</div>
              <div class="text-caption text-black">
                Ville : {{ this.place.city }}
                <q-space/>
                Réputation : (a venir)
                <q-space/>
                Type de lieu : (a venir)
              </div>
              <div class="text-caption text-black" v-if="this.place.tags != null">
                <q-space/>
                Service pris en charge par l'hôpital :
                <q-space/>
                <q-list v-for="(place, index)  in this.tags" :key="index" >
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label overline>{{ place.tags }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>

            <q-card-section class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'DetailsPlace',
  data () {
    return {
      current_place: this.$route.params.current_place,
      tags: null,
      place: null
    }
  },
  created () {
    axiosInstance.post('place/getPlace',
      { id: this.current_place }
    ).then((response) => {
      this.place = response.data
      console.log(this.place.tags)
      axiosInstance.post('place/getServices',
        { tags: this.place.tags }
      ).then((response) => {
        this.tags = response.data
      })
    })
  }
}
</script>

<style scoped>

</style>
