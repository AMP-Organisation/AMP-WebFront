<template>
  <div>
    <q-page>
      <div class="q-ml-md q-mt-md q-mb-md">
        <div class="row justify-left">
          <div class="col-1">
            <q-icon name="medication" color="cyan-8" :size="'xl'" />
          </div>
          <div class="col">
            <div class="text-h4">{{ intro }}</div>
          </div>
        </div>
      </div>

      <q-list bordered separator>
        <q-item
          v-for="med in medicine"
          v-bind:key="med.id"
          v-on:click="medicine_selected = med"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ med.name }}</q-item-label>
                <q-item-label caption>{{
                  med.dose
                }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-pa-md">
        <q-table
          class="my-sticky-column-table"
          title="Medicines"
          :data="medicine"
          :columns="columnsTab"
          row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="positive"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'expand_less' : 'expand_more'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class row>
                  <div class="text-left">
                  This is expand slot for row above: {{ props.row.name }}. And
                  with id : {{ props.row.id }}
                  </div>
                  <q-btn
                  rounded
                  flat
                  color="secondary"
                  icon="double_arrow"
                  v-on:click="doSomething(props.row.id)"
                  />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="q-mt-md q-mb-md justify-right">
          <q-btn
          color="warning"
          icon="add"
          v-show="!addNewMed"
          v-on:click="addNewMed = true"
          />
      </div>
      <div v-show="addNewMed">
        <p>et la il y a la carte pour ajouter un medicament</p>
        <q-btn style="background: #FF0080; color: white" icon="sick" v-on:click="addNewMed = false"/>
      </div>
    </q-page>
  </div>
</template>
<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'medicine_page',
  data () {
    return {
      intro: 'la page de medicament',
      addNewMed: false,
      medicine: [],
      columnsTab: [
        {
          label: 'Name',
          name: 'name',
          required: true,
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          label: 'Dose',
          name: 'Dose',
          required: true,
          field: 'dose'
        },
        {
          label: 'Dose Maximal',
          name: 'Dose Maximal',
          required: true,
          field: 'dose_max'
        }
      ]
    }
  },
  methods: {
    loadDiseases () {
      axiosInstance.get('medicines').then(elem => {
        this.medicine = elem.data
        // this.maxPages = this.disease.length / this.maxPerPage + 1
        // this.diseasePages = this.disease.slice(0, this.maxPerPage)
      })
      // this.maxPages = 6
    },
    doSomething (id) {
      console.log(`j'ai reçu l'id :${id}`)
    }
  },
  created () {
    console.log('medicine page created')
    this.loadDiseases()
  }
}
</script>
<style lang=""></style>
