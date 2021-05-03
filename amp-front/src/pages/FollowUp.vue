<template>
  <div>
    <IconAndTitle :title="intro" :color="'teal-4'"/>
    <div>
      <q-card class="q-ml-md q-mr-md ">
        <q-card-section>
          <p>toto</p>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-list bordered separator  v-for="wdata in weekData" v-bind:key="wdata.date">
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>{{wdata.date}}</q-item-label>
              </q-item-section>
              <q-item-section>le : {{ wdata.date }} weight {{ wdata.weight}} </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <LineChart v-if="datatab" :chartData="dataChart" :options="dataOption" :which="true" :duration="'week'" :dataToCompute="dataTabdeci"/>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
// import { axiosInstance } from 'boot/axios'
import IconAndTitle from 'components/IconAndTitleHeader.vue'
import LineChart from 'components/LineChart.vue'

export default {
  name: 'followup_page',
  data () {
    return {
      intro: 'Follow Up Page For IMC',
      test: {
        toto: 'titi'
      },
      dataTabdeci: [75.4, 75.1, 74.8, 74.3, 75.1, 75.2, 75.1],
      weekData: [
        {
          date: '2021-04-030T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-04-029T15:01:09.538Z',
          weight: 74
        },
        {
          date: '2021-04-028T15:01:09.538Z',
          weight: 74
        },
        {
          date: '2021-04-027T15:01:09.538Z',
          weight: 74
        },
        {
          date: '2021-04-026T15:01:09.538Z',
          weight: 74
        },
        {
          date: '2021-04-025T15:01:09.538Z',
          weight: 74
        },
        {
          date: '2021-04-024T15:01:09.538Z',
          weight: 74
        }
      ],
      monthData: [
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        },
        {
          date: '2021-02-09T15:01:09.538Z',
          weight: 75
        }
      ],
      dataOption: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'My Data bis'
        }
      },
      datatab: [],
      dataChart: {
        labels: [
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
          'Dimanche'
        ],
        datasets: [
          {
            label: 'Data 1',
            data: [42, 36, 76, 42, 36, 76, 42, 36, 76, 42, 36, 76],
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)'
          }
        ]
      }
    }
  },
  components: {
    IconAndTitle,
    LineChart
  },
  created () {
    console.log('dans la page follow up')
    console.log(this.test)
    console.log(this.dataChart)
    this.weekData.filter(elem => {
      this.datatab.push(elem.weight)
    })
    console.log(this.datatab)
    // this.dataChart.datasets[0].label = 'Toto'
    // this.dataChart.datasets[0].data = this.datatab
    console.log(this.dataChart)
  }
}
</script>
