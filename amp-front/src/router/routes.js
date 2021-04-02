
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue'), meta: { requiresAuth: true } },
      { path: '/info', name: 'info', component: () => import('pages/Info.vue') },
      { path: '/disease', name: 'disease', component: () => import('pages/Disease.vue') },
      {
        path: '/disease/:id',
        name: 'disease_details',
        component: () => import('pages/DeseasePageDetails.vue'),
        props: r => ({ id: r.params.id })
      }
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
