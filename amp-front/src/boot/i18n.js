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
    allergy_warning: 'Be careful, you want to add a drug to which you are allergic',
    existing_treatment: 'Existing treatment',
    new_treatment: 'New treatment',
    select_treatment: 'Select the treatment to associated',
    options_treatment: 'fevers, stomach aches, ...',
    assign_treatment: 'Assign treatment',
    specify_treatment: 'Indicate the information of the new treatment :',
    treatment_name: 'the name of your treatment',
    rules_treatment: 'Your must be more than 5 characters...',
    description_treatment: 'The description of your treatment',
    create_treatment: 'Create the treatment',
    allergy: 'This medicine contains something to which you are allergic',
    assign_to_treatment: 'Assign to a treatment',
    validation: 'Validation request',
    delete_medicine: 'Delete this medicine ?',
    max_dose: 'Maximum dose',
    time: 'time between two dose :',
    exist_in: 'Exist in :',
    delete: 'Delete',
    delete_pillbox: 'Delete this pillbox ?',
    yes: 'yes',
    no: 'no',
    existing_pillbox: 'Existing pillbox',
    new_pillbox: 'New pillbox',
    select_pillbox: 'Select a treatment to associate with a pillbox',
    pillbox_available: 'pillbox available',
    treatment_available: 'treatment available',
    assign_pillbox: 'Assign to a pillbox',
    new_pillbox_information: 'Write the information about the new pillbox',
    rules_description: 'Your description must be more than 8 characters...',
    pillbox_name: 'The name of your pillbox',
    pillbox_description: 'the description of your pillbox',
    create_pillbox: 'Create this pillbox',
    complete_information: 'Complete your information',
    allergy_options: 'active ingredient in allergy',
    disease_options: 'chronic disease(s)',
    blood_group: 'blood group',
    health_card_detail: 'By validating this form, you agree that your information will be recorded, do you wish to continue ?',
    welcome_health_card1: 'Hello, welcome to your health card, you can fill in your personal information if you wish, \n so that we can help you as best as possible.',
    welcome_health_card2: 'Cordially,',
    welcome_health_card3: 'AMP team.',
    informations_user_health_card: 'Your informations',
    actual_information_health: 'Below is your current information',
    blood_missing: 'You did not specify your blood group',
    allergy_title: 'Allergy',
    no_allergy: 'You don\'t have allergy',
    chronical_disease: 'Chronic disease',
    no_disease: 'You have no disease',
    save: 'Save',
    place_more_information: 'More informations',
    city: 'City :',
    reputation: 'Reputation :',
    type_place: 'Type',
    hospital_service: 'Service supported by the hospital :',
    // page de #followup
    follow_up_title_page: 'Follow up Page',
    follow_up_subtitle: 'Follow Up BMI',
    week_tlt: 'Week',
    month_tlt: 'Month',
    semester_tlt: 'Semester',
    year_tlt: 'Year',
    add_data: 'Add new data',
    cancel: 'cancel',
    cur_weight: 'Your current weight',
    cur_imc: 'Your BMI computed',
    cur_height: 'Your size in meters',
    label_details_weight: 'According to your weight : ',
    label_detail_imc: 'You have as BMI : ',
    button_imc_surpoids: 'Over weight',
    button_imc_maigreur: 'Thinness',
    button_imc_famine: 'Famine',
    button_imc_obese: 'Obesity',
    button_imc_normal: 'Normal',
    info_height: 'Set in your helth card',
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
    allergy_warning: 'Attention, vous voulez ajouter un médicament auquel vous êtes allergique',
    existing_treatment: 'Traitement existant',
    new_treatment: 'Nouveau traitement',
    select_treatment: 'Sélectionner le traitement à associer',
    options_treatment: 'fièvres, maux de ventres, ...',
    assign_treatment: 'Assigné au traitement',
    specify_treatment: 'Indiqué les information du nouveau traitement :',
    treatment_name: 'Le nom de votre traitement',
    rules_treatment: 'Votre nom doit comporter plus de 5 caractères...',
    rules_description: 'Votre description doit comporter plus de 8 caractères...',
    description_treatment: 'La description de votre traitement',
    create_treatment: 'Créer le traitement',
    allergy: 'Ce médicament contient un élément auquel vous êtes allergique',
    assign_to_treatment: 'Assigné à un traitement',
    validation: 'Demande de validation',
    delete_medicine: 'Supprimer ce médicament ?',
    time: 'Temps entre deux dose :',
    max_dose: 'Dose maximum',
    exist_in: 'Existe sous forme :',
    delete: 'Supprimer',
    delete_request: 'Etes vous sure de supprimer ce médicament',
    delete_pillbox: 'Supprimer ce pillulier ?',
    yes: 'oui',
    no: 'non',
    existing_pillbox: 'Pillulier existant',
    new_pillbox: 'Nouveau pillulier',
    select_pillbox: 'Sélectionner un traitement à associer à un pillulier :',
    pillbox_available: 'pillulier disponibles',
    treatment_available: 'traitement disponible',
    assign_pillbox: 'Assigné à un pillulier',
    new_pillbox_information: 'Indiqué les informations du nouveau pillulier :',
    pillbox_name: 'Le nom de votre pillulier',
    pillbox_description: 'La description de votre pillulier',
    create_pillbox: 'Créer ce pillulier',
    complete_information: 'Compléter vos informations',
    allergy_options: 'allergie(s) principe actif',
    disease_options: 'maladie(s) chronique',
    blood_group: 'groupe sanguin',
    health_card_detail: 'En validant cette fiche, vous acceptez que vos informations soit enregistré, souhaitez-vous continué ?',
    welcome_health_card1: 'Bonjour, bienvenu sur votre fiche de santé, vous pouvez renseigner vos informations personnelle si vous le souhaitez,\n' +
      '              affin que nous puissions vous aider du mieux que possible.',
    welcome_health_card2: 'Cordialement,',
    welcome_health_card3: 'AMP team.',
    informations_user_health_card: 'Vos informations',
    actual_information_health: 'Ci-dessous, vos informations actuelles',
    blood_missing: 'Vous n\'avez pas indiqué votre groupe sanguin',
    allergy_title: 'Allergie(s)',
    no_allergy: 'Vous n\'avez aucune allergie',
    chronical_disease: 'Maladie(s) chronique :',
    no_disease: 'Vous n\'avez pas de maladie',
    save: 'Enregistrer',
    place_more_information: 'Plus d\'informations',
    city: 'Ville :',
    reputation: 'Réputation :',
    type_place: 'Type de lieux',
    hospital_service: 'Service pris en charge par l\'hôpital :',
    // page #followup
    follow_up_title_page: 'Page de suivi',
    follow_up_subtitle: 'Suivi IMC',
    week_tlt: 'Semaine',
    month_tlt: 'Mois',
    semester_tlt: 'Semestre',
    year_tlt: 'An',
    add_data: 'Ajout d\'une nouvelle donnée',
    cancel: 'annuler',
    cur_weight: 'Votre poids actuel',
    cur_imc: 'Votre IMC calculé',
    cur_height: 'Votre Taille en mètre',
    label_details_weight: 'Pour votre poids actuel : ',
    label_detail_imc: 'Vous avez comme IMC : ',
    button_imc_surpoids: 'Surpoids',
    button_imc_maigreur: 'Maigreur',
    button_imc_famine: 'Famine',
    button_imc_obese: 'Obésité',
    button_imc_normal: 'Normal',
    info_height: 'Initialisé dans votre fiche de santé',
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
