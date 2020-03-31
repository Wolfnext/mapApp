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
        <v-card-subtitle>Average rental price in the test are is $50</v-card-subtitle>
                <div class=""><v-range-slider messages v-model="priceRange" :max="maxPrice" :min="minPrice"></v-range-slider></div>
                {{priceRange}}
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="main__fontFamily" small text @click="menu = false">Cancel</v-btn>
          <v-btn class="main__fontFamily" small color="primary" @click="menu = false">Apply</v-btn>
        </v-card-actions>
      </v-container>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      priceRange: [200, 500],
      maxPrice: 600,
      minPrice: 200
    }
  },
  mounted () {
  }
}
</script>
