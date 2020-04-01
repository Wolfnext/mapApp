import Vuex from 'Vuex'
import Vue from 'vue'
Vue.use(Vuex)

const newMap = new Vuex.Store({
  state: () => ({
    filter: { priceRange: [], bedrooms: 0, bathrooms: 0, allowSmoking: false, allowPets: false, eightHousing: false },
    placeData: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-79.955667, 40.417224]
        },
        properties: {
          title: 'Mapbox',
          price: '200',
          currency: '$',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-79.955621, 40.412224]
        },
        properties: {
          title: 'Mapbox',
          price: '200',
          currency: '$',
          description: 'San Francisco, California'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-79.9895321, 40.413224]
        },
        properties: {
          title: 'Mapbox',
          price: '500',
          currency: '$',
          description: 'San Francisco, California'
        }
      }]
    }
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
