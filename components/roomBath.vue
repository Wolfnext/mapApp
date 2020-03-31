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
        <span class="main__fontFamily">{{filter.bedroom}}</span>
         <v-btn-toggle
          multipletoggle_exclusive
          rounded
          dark
          >
          <v-btn color="secondary" small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="secondary" small>
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
      <v-icon large>mdi-bed-queen-outline</v-icon>
        <span class="main__fontFamily">Bathrooms</span>
        <span class="main__fontFamily">{{filter.bathroom}}</span>
         <v-btn-toggle
          multipletoggle_exclusive
          rounded
          dark
          >
          <v-btn color="secondary" small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="secondary" small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-btn-toggle>
        </v-row>
        </v-container>
        <v-card-actions class="mt-4">
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
      filter: { bedroom: 0, bathroom: 0 }
    }
  },
  mounted () {
  }
}
</script>
