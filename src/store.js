import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clue: {},
    score: 0,
    count: 0,
    refresh: 0
  },
  mutations: {
    setClue (state, clue) { state.clue = clue },
    updateScore (state, value) { state.score = value },
    updateCount (state, value) { state.count = value },
    updateRefresh (state, value) { state.refresh = value }
  },
  actions: {
    getClue ({ commit }) {
      Axios.get(`https://jservice.io/api/random?count=1`)
        .then(response => {
          let temp = response.data[0]
          temp.answer = formatAnswer(temp.answer)
          commit(`setClue`, temp)
        })
    }
  }
})

//utilities
function formatAnswer (a) {
  let tmp = document.createElement('div')
  let bs = /\\/gi
  let qu = /\"/gi
  tmp.innerHTML = a
  tmp = tmp.textContent || tmp.innerText
  tmp = tmp.replace(bs, '')
  tmp = tmp.replace(qu, '')
  return tmp
}
