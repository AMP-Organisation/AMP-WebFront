<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-page-container class="container-fluid">
      <IconAndTitle v-bind:title="this.$t('place')" :icon="'star'" :color="'blue-9'"/>
      <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1"
               v-bind:label="this.$t('places_search')">
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search"/>
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
        </template>
      </q-input>
      <div class="q-ma-sm q-mt-md">
        <div class="row">
          <q-select
            filled
            class="GNL__select"
            v-model="select_model"
            use-input
            v-bind:label="this.$t('places_type')"
            :options="options"
            option-value="id"
            option-label="type"
            @filter="filterFn"
            @input="getPlaceFiltered"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn class="GNL__btn_reset" color="secondary" icon-right="restart_alt" label="reset" v-on:click="reset"/>
        </div>
        <q-list class="q-ma-sm q-mt-md">
          <q-expansion-item
            v-for=" (place, index) in getResults" :key="index"
            style="border-radius: 10px"
            popup
            header-class="bg-white"
          >
            <!-- Symbole de la maladie -->
            <template v-slot:header>
              <q-item-section avatar>
                <!--
                <q-avatar>
                  <img :src="mail.avatar">
                </q-avatar>
                -->
              </q-item-section>
              <!-- Nom de la maladie, niveau de danger -->
              <q-item-section>
                <q-item-label>{{place.address}}</q-item-label>
                <q-item-label caption>{{place.city}}</q-item-label>
              </q-item-section>
            </template>

            <q-separator/>
            <q-card>
              <!-- Introduction de la maladie -->
              <q-card-section>
                {{place.department}}
              </q-card-section>
              <!-- Lien la maladie -->
              <q-card-section>
                <q-btn color="primary" icon="more"
                       v-on:click="$router.push({name:'details_places', params: { current_place: place.id }})"
                >
                  {{ $t('place_more_information')}}
                </q-btn>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'Place',
  data: function () {
    return {
      search: '',
      defaults_place: [],
      place_selected: this.defaults_place,
      select_model: '',
      optionsDefault: [],
      options: this.optionsDefault
    }
  },
  created () {
    axiosInstance.get('place/getAll')
      .then(
        response => {
          this.place_selected = response.data
        }
      )
    axiosInstance.get('place/type_place')
      .then(
        response => {
          this.optionsDefault = response.data
          this.options = response.data
        }
      )
  },
  components: {
    IconAndTitle
  },
  computed: {
    getResults () {
      if (this.search === '') { return this.place_selected } else {
        return this.place_selected.filter((result) => {
          return result.address.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.optionsDefault
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.optionsDefault.filter(v => v.type.toLowerCase().indexOf(needle) > -1)
      })
    },
    getPlaceFiltered () {
      axiosInstance.get('place/filter_type/' + this.select_model.id)
        .then(
          response => {
            this.place_selected = response.data
          }
        )
    },
    reset () {
      this.select_model = ''
      this.search = ''
      axiosInstance.get('place/getAll')
        .then(
          response => {
            this.place_selected = response.data
          }
        )
    }
  }
}
</script>

<style>
.GNL__toolbar-input {
  width: 55%;
  margin-left: 20%;
  margin-top: 5%;
  display: flex;
}
.GNL__select {
  width: 55%;
  margin-left: 20%;
}

.GNL__btn_reset {
  margin-left: 2%;
}
</style>
