// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(store)


// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.name != '') {
      if(to.meta.allAuth){
        if(store.state.user.author==1){
          next();
        }else{
          if(store.state.user.author==2) {
            console.log('2')
            next({
              path: '/2',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==3) {
            next({
              path: '/3',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==4) {
            next({
              path: '/4',
              query: {redirect: to.fullPath}
            })
          }else{
            next()
          }
        }
      }
      else if(to.meta.comunityAuth){
        if(store.state.user.author<=2){
          next();
        }else{
          if(store.state.user.author==2) {
            next({
              path: '/2',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==3) {
            next({
              path: '/3',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==4) {
            next({
              path: '/4',
              query: {redirect: to.fullPath}
            })
          }else{
            next()
          }
        }
      }
      else if(to.meta.buildAuth){
        if(store.state.user.author<=3){
          next();
        }else{
          if(store.state.user.author==2) {
            next({
              path: '/2',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==3) {
            next({
              path: '/3',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==4) {
            next({
              path: '/4',
              query: {redirect: to.fullPath}
            })
          }else{
            next()
          }
        }
      }
      else if(to.meta.unitAuth){
        if(store.state.user.author<=4){
          next();
        }else{
          if(store.state.user.author==2) {
            next({
              path: '/2',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==3) {
            next({
              path: '/3',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==4) {
            next({
              path: '/4',
              query: {redirect: to.fullPath}
            })
          }else{
            next()
          }
        }
      }
      else if(to.meta.hostAuth){
        if(store.state.user.author<=5){
          next();
        }else{
          if(store.state.user.author==2) {
            next({
              path: '/2',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==3) {
            next({
              path: '/3',
              query: {redirect: to.fullPath}
            })
          }else if(store.state.user.author==4) {
            next({
              path: '/4',
              query: {redirect: to.fullPath}
            })
          }else{
            next()
          }
        }
      }

    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

/*function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}*/

new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
