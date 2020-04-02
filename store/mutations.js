/*eslint-disable */
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
    let allowSmokingFlag, allowPetsFlag, eightHousingFlag
    if(!state.filters.allowSmoking) allowSmokingFlag = true
    if(!state.filters.allowPets) allowPetsFlag = true
    if(!state.filters.eightHousing) eightHousingFlag = true
    tempPlaceData.features = state.placeData.features.filter((data) => {
      return (parseInt(data.properties.price.match(/\d+/g).map(Number)) > state.filters.priceRange[0] && parseInt(data.properties.price.match(/\d+/g).map(Number)) < state.filters.priceRange[1] ) && 
      data.properties.bedrooms >= state.filters.bedrooms && data.properties.bathrooms >= state.filters.bathrooms &&
       (allowSmokingFlag || (data.properties.allowSmoke == state.filters.allowSmoking)) && 
       (allowPetsFlag || (data.properties.allowPets == state.filters.allowPets)) && 
   	   (eightHousingFlag || (data.properties.eightHousing == state.filters.eightHousing))})
    state.filterData = tempPlaceData
  }
}
