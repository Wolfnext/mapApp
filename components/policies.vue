<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
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
        justify="space-around"
      >
<span class="main__fontFamily">{{policie.title}}</span>
 <v-switch v-model="people" value="John"> </v-switch></v-flex>
 </v-row>
<v-divider />

</v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="main__fontFamily" small text @click="menu = false">Cancel</v-btn>
          <v-btn class="main__fontFamily" small color="primary" @click="menu = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      policiesList: [{ title: 'Smoking Allowed', model: 'allowSmoke' }, { title: 'Pets Allowed', model: 'allowSmoke' }, { title: 'Section 8 Housing', model: 'allowSmoke' }]
    }
  },
  mounted () {
  }
}
</script>
