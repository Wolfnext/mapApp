<template>
  <v-app dark>
    <v-app-bar
    fixed
    app
    light
    color="white"
    >
    <v-app-bar-nav-icon class="ml-3">
      <v-img width="50" src="office-building.svg"></v-img>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="bar__title">IKOS</v-toolbar-title>
    <v-spacer></v-spacer>
    <span class="hidden-md-and-down" :key="index" v-for="(item, index) in menuButtons">
      <v-btn v-if="!item.menuExtension" text>
        <span >{{item.text}}</span>
      </v-btn>
      <v-menu v-if="item.menuExtension" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
          text
          v-on="on"
          >
          <span>{{item.text}}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        v-for="(itemMenu, index) in item.menuList"
        :key="index"
        @click="(()=>{})"
        >
        <v-list-item-title>{{ itemMenu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</span>
<v-menu class="hidden-sm-and-up" offset-y>
  <template v-slot:activator="{ on }">
    <v-btn
    text
    class="hidden-sm-and-up"
    v-on="on"
    >
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>
<v-list>
  <v-list-item :key="index" v-for="(item, index) in menuButtons">
    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
  </v-list-item>
</v-list>
</v-menu>

</v-app-bar>
<v-content>
  <nuxt />
</v-content>
<v-footer
:fixed="fixed"
app
>
<span>&copy; Adrian Wolf {{ new Date().getFullYear() }}</span>
</v-footer>
</v-app>
</template>

<script>
export default {
  computed: {
    mapa () { return this.$store.state.map.mapa }
  },
  mounted () { this.$router.push({ path: '/map' }) },
  data () {
    return {
      menuButtons: [{ text: 'Services', menuExtension: true, menuList: [{ title: 'One' }, { title: 'two' }, { title: 'three' }] }, { text: 'About' }, { text: 'Contact' }]
    }
  }
}
</script>

<style>
.bar__title{
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 8px;
  font-weight: 900;

}

</style>
