import Vue from 'vue'

const moisFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const semaineFR = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const fr = true

let month = null
let week = null
if (fr) {
  month = moisFr
  week = semaineFR
}

Vue.prototype.$strOne = 'test ajout string global'

export { month, week }
