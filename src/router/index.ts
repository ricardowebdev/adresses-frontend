import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'enderecos',
      component:() => import('@/components/Enderecos/Enderecos.vue')
    },
    {
      path: '/endereco',
      name: 'endereco',
      component:() => import('@/components/Enderecos/EnderecoForm/EnderecoForm.vue')
    },
    {
      path: '/endereco/:id',
      name: 'edit-endereco',
      component:() => import('@/components/Enderecos/EnderecoForm/EnderecoForm.vue')
    },
    {
      path: '/logs',
      name: 'logs',
      component:() => import('@/components/Logs/Logs.vue')
    },
    {
      path: '/logs/:id',
      name: 'logs-detalhes',
      component:() => import('@/components/Logs/LogsDetalhes/LogsDetalhes.vue')
    },
    {
      path: '/mapas',
      name: 'mapa',
      component:() => import('@/components/Mapas/Mapas/Mapa.vue')
    }
  ]
})

export default router
