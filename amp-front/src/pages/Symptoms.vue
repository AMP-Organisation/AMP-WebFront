<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-page-container class="container-fluid">
      <IconAndTitle :title="this.$t('symptoms')" :icon="'coronavirus'" :color="'light-green-14'"/>
      <div class="q-ma-sm q-mt-md">
        <div class="row">
          <q-select
            class="GNL__select"
            multiple
            use-chips
            color="green"
            v-model="select_model"
            use-input
            v-bind:label="this.$t('symptoms_exemple')"
            :options="options"
            option-value="id"
            option-label="name"
            @filter="filterFn"
            @input="getDiseaseFiltered"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-list class="q-ma-sm q-mt-md">
          <q-expansion-item
            v-for=" (disease, index) in this.disease_selected" :key="index"
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
                <q-item-label>{{disease.name_disease}}</q-item-label>
                <q-item-label caption>{{disease.description}}</q-item-label>
              </q-item-section>
            </template>

            <q-separator/>
            <q-card>
              <!-- Introduction de la maladie -->
              <q-card-section>
                <div v-if="!disease.is_vaccine"> Il n'existe pas de vaccin à l'heure actuelle</div>
                <div v-else> Il existe un vaccin</div>
              </q-card-section>
              <!-- Lien la maladie -->
              <q-card-section>
                <q-btn color="primary" icon="more" label="Plus d'informations sur la maladie"
                       :to="{name: 'disease_details', params:{id: disease.id} }"
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
import IconAndTitle from 'components/IconAndTitleHeader.vue'

export default {
  name: 'Symptoms',
  data: function () {
    return {
      select_model: [],
      disease_default: [],
      disease_selected: this.disease_default,
      optionsDefault: [],
      options: this.optionsDefault
    }
  },
  created () {
    axiosInstance.get('symptoms/getAll').then(
      response => {
        this.optionsDefault = response.data
        this.options = response.data
      }
    ).catch(
      err => console.log(err)
    )
    axiosInstance.get('diseases/').then(
      response => {
        this.disease_default = response.data
        this.disease_selected = response.data
      }
    ).catch(
      err => console.log(err)
    )
  },
  components: {
    IconAndTitle
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
        this.options = this.optionsDefault.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    getDiseaseFiltered () {
      if (this.select_model.length === 0) {
        this.disease_selected = this.disease_default
      } else {
        const allName = []
        this.select_model.forEach(element => allName.push(element.name))
        console.log(this.select_model)
        axiosInstance.post('symptoms/getSymptoms',
          { all_name: allName }).then(
          response => {
            this.disease_selected = response.data
          }
        ).catch(
          err => {
            this.disease_selected = null
            console.log(err)
          }
        )
      }
    }
  }
}
</script>

<style>
.GNL__select {
  width: 55%;
  margin-left: 20%;
  margin-top: 5%;
  display: flex;
}
</style>
