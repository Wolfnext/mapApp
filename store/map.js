import Vuex from 'Vuex'
import Vue from 'vue'
Vue.use(Vuex)

const newMap = new Vuex.Store({
  state: () => ({
    counter: 0,
    mapa: 'mapa'
  }),
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
  }
})
export default newMap
