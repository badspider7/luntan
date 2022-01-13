import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import page from './Pages'
import login from './Login'

export default new Vuex.Store({
  modules: {
    page,
    login
  }
})
