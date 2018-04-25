import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      user:{
        name:'',
        pwd:'',
        author:'',
      },
      auth:{
        comunity:'',
        comunityid:'',
        build:'',
        unit:'',
        add:false,
        edit:false,
        delete:false
      }
    },

    mutations:{
      isLogin (state,user) {
        this.state.user = user
      },
      Logout(state){
        this.state.user.name=''
        this.state.user.pwd=''
        this.state.user.author=''
        this.state.auth = {}
      },
      setAuth(state,auth){
        this.state.auth = auth
      }
    },
})

