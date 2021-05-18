import Vue from 'vue'

const moisFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const semaineFR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const fr = true

let month = null
let week = null
if (fr) {
  month = moisFr
  week = semaineFR
}

Vue.prototype.$strOne = 'test ajout string global'

export { month, week }
