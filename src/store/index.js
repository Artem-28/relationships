import Vue from 'vue'
import Vuex from 'vuex'
import Boxes from './modules/boxes'
import Relationship from './modules/relationship'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Boxes,
    Relationship
  }
})
