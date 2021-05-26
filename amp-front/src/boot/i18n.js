import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    appName: 'Assistant Medical Personnal',
    settings: 'Settings',
    profile: 'Profil',
    place: 'Page to find a place',
    medicine: 'medicine page',
    health_card: 'Health Card',
    help_feedback: 'Help & Feedback',
    messageNickname: 'Welcome',
    welcomeMsg: 'Welcome to Assistant Medical Personnal',
    messageAccueil: 'This is the home page of ours application assistant medical personnal',
    medicine0: 'Name',
    medicine1: 'dose',
    medicine2: 'maximum dose',
    medicine3: 'delay',
    symptoms: 'Page to find your symptoms',
    disease: 'Page to find a disease',
    find_disease: 'search a disease',
    symptoms_exemple: 'fevers, stomach aches, ...',
    places_type: 'Hospital, pharmacy, ...',
    places_search: 'Hospital of ...',
    pillbox_search: 'Treatment headache...',
    profil_page: 'Profile page',
    last_name: 'Lastname',
    first_name: 'Firstname',
    username: 'Username',
    notification_title: 'notification page of the user',
    covid_information: ' welcome to this information page about the evolution of covid in france, down below you will find the latest news',
    data_in_france: 'Global data in France :',
    total_death: 'Number of people deceased',
    total_cured: 'Number of people cured',
    hospitalized: 'hospitalized',
    reanimation: 'reanimation',
    more_information: 'for more information you can search your department to find his actual state.\n',
    department_search: 'Information by department',
    dialog_warning: 'Warning',
    link0: 'Informations',
    link1: 'Places',
    link2: 'Medicines',
    link3: 'Symptoms',
    link4: 'Disease',
    link5: 'Pillbox',
    link6: 'Profile',
    link7: 'Notifications',
    link8: 'Forums',
    link9: 'Covid news'
  },
  fr: {
    appName: 'Assistant Médical Personnel',
    settings: 'Options',
    profile: 'Profile',
    place: 'Page pour trouver un lieux',
    medicine: 'la page de medicament',
    health_card: 'Fiche de santé',
    help_feedback: 'Aide & Feedback',
    messageNickname: 'Bienvenue',
    welcomeMsg: 'Bienvenu dans l\'Assistant Médical Personnel',
    messageAccueil: 'Ceci est la page d\'accueil de notre application assistant medical personnel',
    medicine0: 'Nom',
    medicine1: 'dose',
    medicine2: 'maximum dose',
    medicine3: 'delay',
    symptoms: 'Page pour rechercher vos symptomes',
    disease: 'Page pour rechercher une maladie',
    find_disease: 'trouver une maladie',
    symptoms_exemple: 'fièvres, maux de ventres, ...',
    places_type: 'Hôpital, pharmacie, ...',
    places_search: 'Hôpital de ...',
    pillbox_search: 'Traitement migraine...',
    profil_page: 'Page de profile',
    last_name: 'Nom de famille',
    first_name: 'Prénom',
    username: 'Pseudo',
    notification_title: 'page de notification de l\'utilisateur',
    covid_information: 'Bienvenue sur cette page d\'information sur l\'évolution de la covid en France, ci-dessous, vous trouverez les\n' +
      '          Information journalière quotidienne.',
    data_in_france: 'Données globale en France :',
    total_death: 'Nombre de personne au total décédé',
    total_cured: 'Nombre de personne au total guéris',
    hospitalized: 'Actuellement hospitalisé',
    reanimation: 'réanimation',
    more_information: 'Pour plus d\'information, vous pouvez également rechercher votre département afin de pouvoir constater son état actuel.\n',
    department_search: 'Informations par département',
    dialog_warning: 'Avertissement',
    link0: 'Informations',
    link1: 'Lieux',
    link2: 'Médicaments',
    link3: 'Symptomes',
    link4: 'Maladies',
    link5: 'Pillulier',
    link6: 'Profile',
    link7: 'Notifications',
    link8: 'Forums',
    link9: 'Actualité covid'
  }
}

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
