<template>
  <div class="text-center main__fontFamily">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="250"
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
          <span>Room/Bath</span>
          <v-icon right>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-card>
         <v-container>
        <v-container>
        <v-row
        class=""
        align="center"
        justify="space-around"
      >
        <v-icon large>mdi-bed-queen-outline</v-icon>
        <span class="main__fontFamily">Bedrooms</span>
        <span class="main__fontFamily">{{bedrooms}}</span>
         <v-btn-toggle
          multipletoggle_exclusive
          rounded
          dark
          >
          <v-btn @click="bedrooms++" color="secondary" small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="() => { if(bedrooms>0) bedrooms-- }" color="secondary" small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
      </v-container>
<v-divider></v-divider>
  <v-container>
                 <v-row
        class=""
        align="center"
        justify="space-around"
      >
      <v-icon large>mdi-shower</v-icon>
        <span class="main__fontFamily">Bathrooms</span>
        <span class="main__fontFamily">{{bathrooms}}</span>
         <v-btn-toggle
          multipletoggle_exclusive
          rounded
          dark
          >
          <v-btn @click="bathrooms++" color="secondary" small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="() => { if(bathrooms>0) bathrooms-- }" color="secondary" small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-btn-toggle>
        </v-row>
        </v-container>
        <v-card-actions class="mt-4">
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
  computed: {
    ...mapState(['filters'])
  },
  data () {
    return {
      menu: false,
      bathrooms: 0,
      bedrooms: 0
    }
  },
  methods: {
    updateFilter () {
      this.menu = false
      const filter = JSON.parse(JSON.stringify(this.filters))
      filter.bedrooms = this.bedrooms
      filter.bathrooms = this.bathrooms
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>
