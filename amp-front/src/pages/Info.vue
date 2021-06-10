<template>
  <div>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="white"
        navigation
        infinite
        :autoplay="true"
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
          <q-btn
            v-if="active"
            size="lg"
            icon="fiber_manual_record"
            color="yellow"
            flat
            round
            dense
            @click="onClick"
          />
          <q-btn
            v-else
            size="sm"
            :icon="btnProps.icon"
            color="white"
            flat
            round
            dense
            @click="onClick"
          />
        </template>

        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ $t('welcomeMsg') }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="column q-mt-md">
        <h4 class="text-center">
          <vue-typer
            :text="[this.$t('welcomeMsg')]"
            :repeat='Infinity'
            :shuffle='false'
            initial-action='typing'
            :pre-type-delay='70'
            :type-delay='70'
            :pre-erase-delay='2000'
            :erase-delay='250'
            erase-style='clear'
            :erase-on-complete='false'
            caret-animation='smooth'
          ></vue-typer>
        </h4>
       <p style="text-align: justify">
         {{ $t('introduction1') }}
         <br>
         <br>
         {{ $t('introduction2') }}
       </p>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'
export default {
  name: 'Info',
  data () {
    return {
      slide: 'style',
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  components: {
    VueTyper
  }
}
</script>
