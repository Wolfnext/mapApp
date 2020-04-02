<template>
  <div class="text-left">
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
      <span>Policies</span>
      <v-icon right>mdi-menu-down</v-icon>
    </v-btn>
  </template>
  <v-card>
    <v-container :key="index" v-for="(policie,index) in policiesList">
     <v-row
     class=""
     align="center"
     justify="space-between"
     >
     <span class="main__fontFamily ml-3">{{policie.title}}</span>
     <v-switch class="mr-3" v-model="policies[index]"> </v-switch></v-flex>
   </v-row>
   <v-divider />

 </v-container>
 <v-card-actions>
  <v-spacer></v-spacer>
  <v-btn class="main__fontFamily" small text @click="menu = false">Cancel</v-btn>
  <v-btn class="main__fontFamily" small color="primary" @click="updateFilter">Save</v-btn>
</v-card-actions>
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
      policiesList: [{ title: 'Smoking Allowed' }, { title: 'Pets Allowed' }, { title: 'Section 8 Housing' }],
      menu: false,
      policies: [0, 0, 0]
    }
  },
  methods: {
    updateFilter () {
      this.menu = false
      const filter = JSON.parse(JSON.stringify(this.filters))
      filter.allowSmoking = this.policies[0]
      filter.allowPets = this.policies[1]
      filter.eightHousing = this.policies[2]
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>
