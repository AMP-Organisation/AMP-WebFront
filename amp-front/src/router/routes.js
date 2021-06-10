
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Info.vue'), meta: { requiresAuth: true } },
      { path: '/info', name: 'info', component: () => import('pages/Info.vue') },
      { path: '/places', name: 'places', component: () => import('pages/Places.vue'), meta: { requiresAuth: true } },
      { path: '/details_place', name: 'details_places', component: () => import('pages/DetailsPlace.vue'), meta: { requiresAuth: true } },
      { path: '/disease', name: 'disease', component: () => import('pages/Disease.vue'), meta: { requiresAuth: true } },
      {
        path: '/disease/:id',
        name: 'disease_details',
        component: () => import('pages/DeseasePageDetails.vue'),
        meta: { requiresAuth: true },
        props: r => ({ id: r.params.id })
      },
      {
        path: '/profil',
        name: 'profil_page',
        component: () => import('pages/ProfilPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/testlinechart',
        name: 'page_de_test_line_chart',
        component: () => import('pages/TestChartLine.vue'),
        meta: { requiresAuth: true }
      },
      // a supprimer car c'est juste une page de test
      {
        path: '/followup',
        name: 'followup_page',
        component: () => import('pages/FollowUp.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/medicine',
        name: 'medicine_page',
        component: () => import('pages/MedicinePage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/medicine/:medicine_id',
        name: 'medicine_details',
        component: () => import('pages/MedicinePageDetails.vue'),
        meta: { requiresAuth: true },
        props: r => ({ medicine_id: r.params.medicine_id })
      },
      {
        path: '/settings',
        name: 'settings_page',
        component: () => import('pages/Settings.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/help',
        name: 'help_page',
        component: () => import('pages/Help.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/notifications',
        name: 'notifications_page',
        component: () => import('pages/Notifications.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/healthCard',
        name: 'HealthCard',
        component: () => import('pages/HealthCard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/optionone',
        name: 'option_one',
        component: () => import('pages/OptionOne.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/optiontwo',
        name: 'option_two',
        component: () => import('pages/OptionTwo.vue'),
        meta: { requiresAuth: true }
      },
      { path: '/symptoms', name: 'symptoms', component: () => import('pages/Symptoms'), meta: { requiresAuth: true } },
      { path: '/pillbox', name: 'pillbox', component: () => import('pages/Pillbox'), meta: { requiresAuth: true } },
      { path: '/news_covid', name: 'Covid', component: () => import('pages/Covid'), meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
