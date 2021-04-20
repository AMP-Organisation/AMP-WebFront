<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">COVID-19 DATA</h1>
      </div>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col">
        <h2 class="text-center">Deaths</h2>
        <LineChart
          v-if="this.dataCollection"
          :chartData="this.dataCollection"
          :options="chartOptions"
          :chartColors="deathColors"
          label="Deaths"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { axiosInstance } from 'boot/axios'
import LineChart from 'components/LineChart'

export default {
  name: 'Covid',
  components: {
    LineChart
  },
  data () {
    return {
      arrHospitalized: [],
      hospitalizedChartColors: {
        borderColor: '#251F47',
        pointBorderColor: '#260F26',
        pointBackgroundColor: '#858EAB',
        backgroundColor: '#858EAB'
      },
      arrInIcu: [],
      inIcuColors: {
        borderColor: '#190B28',
        pointBorderColor: '#190B28',
        pointBackgroundColor: '#E55381',
        backgroundColor: '#E55381'
      },
      arrNewHospitalized: [],
      newHospitalizedChartColors: {
        borderColor: '#077187',
        pointBorderColor: '#0E1428',
        pointBackgroundColor: '#AFD6AC',
        backgroundColor: '#74A57F'
      },
      arrNewInIcu: [],
      inNewIcuColors: {
        borderColor: '#190B28',
        pointBorderColor: '#190B28',
        pointBackgroundColor: '#E55381',
        backgroundColor: '#E55381'
      },
      arrRecovered: [],
      recoveredColors: {
        borderColor: '#4E5E66',
        pointBorderColor: '#4E5E66',
        pointBackgroundColor: '#31E981',
        backgroundColor: '#31E981'
      },
      arrDeaths: [],
      deathColors: {
        borderColor: '#E06D06',
        pointBorderColor: '#E06D06',
        pointBackgroundColor: '#402A2C',
        backgroundColor: '#402A2C'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      dataCollection: null
    }
  },
  async created () {
    axiosInstance.get('https://coronavirusapi-france.vercel.app/FranceLiveGlobalData').then(
      resp => {
        this.dataCollection = resp.data.FranceGlobalLiveData
        /**
         * resp.data.FranceGlobalLiveData.forEach(d => {
          if (d.nom !== 'France') {
            const {
              hospitalises,
              reanimation,
              nouvellesHospitalisations,
              nouvellesReanimations,
              deces,
              gueris
            } = d
            const currentName = d.nom
            this.arrHospitalized.push({ currentName, total: hospitalises })
            this.arrInIcu.push({ currentName, total: reanimation })
            this.arrNewHospitalized.push({ currentName, total: nouvellesHospitalisations })
            this.arrNewInIcu.push({ currentName, total: nouvellesReanimations })
            this.arrRecovered.push({ currentName, total: gueris })
            this.arrDeaths.push({ currentName, total: deces })
          }
        })
         */
      }
    )
  }
}
</script>

<style>
</style>
