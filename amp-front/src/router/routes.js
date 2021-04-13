
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue'), meta: { requiresAuth: true } },
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
        path: '/medicine',
        name: 'medicine_page',
        component: () => import('pages/Medicine.vue'),
        meta: { requiresAuth: true }
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
      { path: '/pillbox', name: 'pillbox', component: () => import('pages/Pillbox'), meta: { requiresAuth: true } }
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
