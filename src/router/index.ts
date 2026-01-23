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

router.beforeEach((to) => {
  const publicPages = ['login', 'esqueci', 'confirma', 'change-required-password'];
  const authRequired = !publicPages.includes(to.name as string);

  if (authRequired && (!isUserLoggedIn() || !isUserDataValid())) {
    return '/';
  }
})

function isUserLoggedIn(): boolean {
  const expirationString = localStorage.getItem('expr');
  if (!expirationString) {
    return false;
  }

  try {
    const expirationDate = new Date(JSON.parse(expirationString));
    const now = new Date();
    return expirationDate > now;
  } catch(error) {
    console.error('Erro ao parsear data de expiração do localStorage:', error);
    localStorage.removeItem('expr');
    return false;
  }
}

function isUserDataValid(): boolean {
  try {
    const usuarioData = localStorage.getItem('lgd');
    if (!usuarioData) {
      return false;
    }
    
    const usuario = JSON.parse(usuarioData);
    if (usuario && usuario.usuario && usuario.usuario.id) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erro ao parsear dados do usuário do localStorage:', error);
    localStorage.removeItem('lgd');
    return false;
  }
}

export default router
