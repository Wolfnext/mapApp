export default {
  updateFilter (state, newFilter) {
    state.filters = newFilter
  },
  updateData (state, testdata) {
    state.placeData = testdata
    state.filterData = testdata
  },
  updateFilteredData (state) {
    const tempPlaceData = JSON.parse(JSON.stringify(state.placeData))
    tempPlaceData.features = state.placeData.features.filter((data) => { return parseInt(data.properties.price.match(/\d+/g).map(Number)) > state.filters.priceRange[0] && parseInt(data.properties.price.match(/\d+/g).map(Number)) < state.filters.priceRange[1] })
    state.filterData = tempPlaceData
  }
}
