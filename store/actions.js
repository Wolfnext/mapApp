import testdata from '../testData/test.js'
export default {
  updateFilter ({ commit }, filter) {
    commit('updateFilter', filter)
    commit('updateFilteredData')
  },
  getDataFromApi ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('updateData', testdata)
        resolve()
      }, 1000)
    })
  }
}
