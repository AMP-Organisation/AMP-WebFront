<template>
  <div class="q-page-container q-pa-lg">
    <div class="row mt-5 mb-5">
      <div class="col">
        <p style="text-align: justify">
          Bienvenue sur cette page d'information sur l'évolution de la covid en France, ci-dessous, vous trouverez les
          Information journalière quotidienne.
        </p>
        <h3 class="text-center">Données globale en France :</h3>
        <Doughnut
          v-if="this.dataCollection"
          :chartData="dataCollection"
          :style="myStyles"
          :options="chartOptions"
        />
        <br>
        <br>
        <p style="text-align: justify">
          Pour plus d'information, vous pouvez également rechercher votre département afin de pouvoir constater son état actuel.
        </p>
        <h3 class="text-center">Informations par département :</h3>
        <q-select
          class="GNL__select"
          color="green"
          v-model="select_model"
          use-input
          label="Rhône, Saint-Omer, ..."
          :options="options"
          option-value="nom"
          option-label="nom"
          @filter="filterFn"
          @input="informationDepartment"
        />
        <br>
        <br>
        <h4 class="text-center" v-if="dataDepartment"> Dernière information pour "{{ this.dataDepartment.datasets[0].label }}"</h4>
        <Doughnut
          v-if="dataDepartment"
          :chartData="dataDepartment"
          :style="myStyles"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { axios } from 'boot/axios'
import Doughnut from 'components/Doughnut'
import moment from 'moment'

export default {
  name: 'Covid',
  components: {
    Doughnut
  },
  data () {
    return {
      dataCollection: null,
      chartOptions: {
        aspectRatio: 1
      },
      myStyles: {
        height: '500px',
        width: '100%',
        position: 'relative'
      },
      optionsDefault: [],
      options: this.optionsDefault,
      select_model: [],
      dataDepartment: null
    }
  },
  created () {
    this.getFranceData()
    this.getDepartmentData()
  },
  methods: {
    getFranceData: function () {
      axios.get('https://coronavirusapi-france.vercel.app/FranceLiveGlobalData').then(
        resp => {
          const result = resp.data.FranceGlobalLiveData
          const deces = result.map(d => d.deces).reverse()
          const gueris = result.map(d => d.gueris).reverse()
          const hospitalises = result.map(d => d.hospitalises).reverse()
          const reanimation = result.map(d => d.reanimation).reverse()
          this.dataCollection = {
            hoverBackgroundColor: 'red',
            hoverBorderWidth: 10,
            labels: ['Nombre de personne au total décédé', 'Nombre de personne au total guéris', 'Actuellement hospitalisé',
              'Actuellement en réanimation'],
            datasets: [
              {
                label: 'Covid en France',
                backgroundColor: ['#000000', '#3db319', '#f19427', '#d70b0b'],
                data: [deces, gueris, hospitalises, reanimation]
              }
            ]
          }
        }
      )
    },
    getDepartmentData: function () {
      const test = moment().subtract(1, 'day').toDate()
      const yesterday = moment(String(test)).format('YYYY-MM-DD')
      axios.get('https://coronavirusapi-france.now.sh/AllDataByDate?date=' + yesterday).then(
        resp => {
          const result = resp.data.allFranceDataByDate
          this.optionsDefault = result
          this.options = result
        }
      )
    },
    filterFn: function (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.optionsDefault
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.optionsDefault.filter(v => v.nom.toLowerCase().indexOf(needle) > -1)
      })
    },
    informationDepartment: function (department) {
      this.dataDepartment = {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Nombre de personne au total décédé', 'Nombre de personne au total guéris', 'Actuellement hospitalisé',
          'Actuellement en réanimation'],
        datasets: [
          {
            label: department.nom,
            backgroundColor: ['#000000', '#3db319', '#f19427', '#d70b0b'],
            data: [department.deces, department.gueris, department.hospitalises, department.reanimation]
          }
        ]
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
