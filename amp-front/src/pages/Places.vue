<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-white text-grey-8">
      <q-toolbar class="GNL__toolbar">
        <!-- Bouton drawer gauche -->
        <q-btn
          flat
          dense
          round
          @click="$q.screen.gt.sm?miniState = !miniState:leftDrawerOpen=!leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />
        <!-- Titre de la page -->
        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <!--          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">-->
          Lieux recensé
        </q-toolbar-title>

        <q-space/>
        <!-- Recherche lieux-->
        <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1"
                 placeholder="Hôpital de...">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
          </template>
        </q-input>

        <q-space/>
        <!-- Profile de l'utilisateur -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="user_picture">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="container-fluid">
      <div class="q-ma-sm q-mt-md">
        <q-select
          filled
          class="GNL__select"
          v-model="select_model"
          use-input
          label="Hôpital, pharmacie, ..."
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
                <q-btn color="primary" icon="more" label="Plus d'informations sur le lieu"
                       v-on:click="$router.push({name:'details_places', params: { current_place: place.id }})"
                />
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
  },
  mounted: function () {
    axiosInstance.get('place/type_place')
      .then(
        response => {
          this.optionsDefault = response.data
          this.options = response.data
        }
      )
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
    }
  }
}
</script>

<style>
.GNL__toolbar {
  height: 64px;
}
.GNL__toolbar-input {
  width: 55%;
}
.GNL__select {
  width: 55%;
}
</style>
