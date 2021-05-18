<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-page-container class="container-fluid">
      <div class="row">
        <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1"
               v-bind:label="this.$t('pillbox_search')">
        <template v-slot:prepend>
          <q-icon v-if="search === ''" name="search"/>
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
        </template>
      </q-input>
        <q-btn
          class="GNL__button"
          color="secondary"
          icon="add"
          v-close-popup
          v-on:click="addNewPillbox = true"
        >
          <q-dialog v-model="addNewPillbox">
            <AddPillboxDialog/>
          </q-dialog>
          <q-tooltip content-class="bg-cyan">
            modifications pillulier
          </q-tooltip>
        </q-btn>
      </div>
      <div class="q-ma-sm q-mt-md">
        <q-list class="q-ma-sm q-mt-md">
          <q-expansion-item
            v-for=" (pillbox, index) in getResults" :key="index"
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
                <q-item-label>{{pillbox.name}}</q-item-label>
                <q-item-label caption>{{pillbox.beginning_date}}</q-item-label>
              </q-item-section>
            </template>

            <q-separator/>
            <q-card>
              <!-- Introduction de la maladie -->
             <div class="row" style="align-items: center">
               <div class="col">
                 <q-card-section>
                   {{pillbox.description}}
                 </q-card-section>
               </div>
               <div class="col-1">
                 <q-btn
                   color="red-9"
                   icon="clear"
                   v-on:click="deletePillboxDialog = true">
                 </q-btn>
                 <q-dialog v-model="deletePillboxDialog">
                   <DeletePillbox
                     :pillbox="pillbox"
                   ></DeletePillbox>
                 </q-dialog>
               </div>
             </div>
              <!-- Lien la maladie -->
             <q-card-section>
               <Treatment class="q-mb-md" v-for="tre in  pillbox.information_treatment"
                          :key="tre.id"
                          :name='tre.name'
                          :id="tre.id"
                          :description="tre.description"
                          :delete-from-pillbox="true"
                          :dateBegin="convertDate(tre.beginning_date)"
                          :dateEnd="tre.ending_date"/>
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
import Treatment from 'components/Treatment'
import { date } from 'quasar'
import AddPillboxDialog from 'components/AddPillboxDialog'
import DeletePillbox from 'components/DeletePillbox'

export default {
  name: 'Pillbox',
  components: {
    Treatment,
    DeletePillbox,
    AddPillboxDialog
  },
  data () {
    return {
      current_treatment: [],
      currents_pillbox: [],
      search: '',
      current_user: JSON.parse(localStorage.getItem('user')),
      addNewPillbox: false,
      deletePillboxDialog: false
    }
  },
  created () {
    axiosInstance.post('pillbox/',
      { id: this.current_user.id })
      .then(
        response => {
          this.currents_pillbox = response.data
          this.currents_pillbox.forEach(pillbox => {
            pillbox.beginning_date = date.formatDate(pillbox.beginning_date, 'DD MMMM YYYY')
            axiosInstance.post('treatment/treatmentRelated',
              { all_treatment: pillbox.list_treatment }).then(
              response => {
                this.current_treatment = response.data
                this.$set(pillbox, 'information_treatment', this.current_treatment)
              }
            )
          })
        }
      )
  },
  computed: {
    getResults () {
      if (this.search === '') { return this.currents_pillbox } else {
        return this.currents_pillbox.filter((result) => {
          return result.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  methods: {
    convertDate (dt) {
      return new Date(dt)
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

.GNL__button {
  margin-top: 5%;
  margin-left: 2%;
}
</style>
