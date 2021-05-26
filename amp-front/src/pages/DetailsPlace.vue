<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
        <q-card
          class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section
              class="q-pl-xl">
              <div class="text-overline">{{ this.place.address }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ this.place.region }}, {{ this.place.department }}</div>
              <div class="text-caption text-black">
                {{ $t('city') }} {{ this.place.city }}
                <q-space/>
                {{ $t('reputation') }}
                <q-space/>
                {{ $t('type_place') }}
              </div>
              <div class="text-caption text-black" v-if="this.place.tags != null">
                <q-space/>
                {{ $t('hospital_service') }}
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
            <q-card-section class="col-6 flex flex-center">
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
.my-card {
  margin-left: 10%;
  margin-top: 3%;
}
.q-pl-xl {
  min-width: 20%;
}
.rounded-borders {
  min-width: 80%;
  margin-top: 5%;
  margin-left: 10%;
}
</style>
