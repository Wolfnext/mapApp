<template>
  <div class="text-center">
    <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    >
    <template v-slot:activator="{ on }">
      <v-btn
      class="ml-3 main__fontFamily"
      color="primary"
      dark
      small
      outlined
      v-on="on"
      >
      <span>Price</span>
      <v-icon right>mdi-menu-down</v-icon>
    </v-btn>
  </template>

  <v-card class="main__fontFamily">
    <v-container>
      <v-card-subtitle>Average price in the visible area is ${{avgPrice}}</v-card-subtitle>
      <div class=""><v-range-slider messages v-model="priceRange" :max="maxPrice" :min="minPrice" :step="10"></v-range-slider></div>
      {{priceRange | priceRangeFilter}}
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="main__fontFamily" small text @click="menu = false">Cancel</v-btn>
        <v-btn class="main__fontFamily" small color="primary" @click="updateFilter">Apply</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</v-menu>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['visibleFeatures'],
  computed: {
    ...mapState(['filters'])
  },
  data () {
    return {
      menu: false,
      priceRange: [0, 500],
      maxPrice: 1500,
      minPrice: 0,
      avgPrice: null
    }
  },
  filters: {
    priceRangeFilter: (priceRange) => {
      return '$' + priceRange[0] + ' - ' + '$' + priceRange[1]
    }
  },
  methods: {
    updateFilter () {
      this.menu = false
      const filter = JSON.parse(JSON.stringify(this.filters))
      filter.priceRange = this.priceRange
      this.$store.dispatch('updateFilter', filter)
    },

    calculateAverageVisiblePlaces () {
      let sumPrice = 0
      this.visibleFeatures.forEach((feature) => {
        sumPrice += parseInt(feature.properties.price.match(/\d+/g).map(Number))
      })
      this.avgPrice = sumPrice / this.visibleFeatures.length
    }
  },
  mounted () {
    if (this.filters.priceRange) { this.priceRange = [...this.filters.priceRange] }
  },
  updated () {
    if (this.visibleFeatures[0]) { this.calculateAverageVisiblePlaces() }
  }
}
</script>
