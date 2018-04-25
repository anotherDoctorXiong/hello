
import Router from 'vue-router'

import login from '@/components/login.vue'
import comunity from '@/components/comunity.vue'
import build from '@/components/build.vue'
import unit from '@/components/unit.vue'
import host from '@/components/host.vue'
import author from '@/components/author.vue'
import application from '@/components/application.vue'


export default new Router({
  routes: [
    {
      path:'/login',
      component:login
    },

    {
      path:'/1',
      meta: {
        requireAuth: true,
        allAuth:true,
      },
      component:author
    },
    {
      path:'/2',
      meta: {
        requireAuth: true,
        comunityAuth:true,
      },
      component:comunity
    },
    {
      path:'/3',
      meta: {
        requireAuth: true,
        buildAuth:true,
      },
      component:build
    },
    {
      path:'/4',
      meta: {
        requireAuth: true,
        unitAuth:true,
      },
      component:unit
    },
    {
      path:'/5',
      meta: {
        requireAuth: true,
        hostAuth:true,
      },
      component:host
    },
    {
      path:'/0',
      meta: {
        requireAuth: true,
        allAuth:true,
      },
      component:application
    }
  ]
})


