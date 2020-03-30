<template>
  <v-layout
    column
    justify-center
    align-center
    light
  >
    <div id="map">
   <v-card
    class="list__card">
    <v-toolbar class="search__toolbar" dark color="primary">
      <v-text-field
        background-color="primary"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

    </v-toolbar>
  </v-card>
    </div>
  </v-layout>
</template>

<script>

export default {
  mounted () {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpb3NhZGlrIiwiYSI6ImNrOGVkNGczMDBoaTUzaG4xOXhybnRnNXMifQ.m4Wm5gaZU0UQUssmkJ5Zkg'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // starting position
      zoom: 9 // starting zoom
    })
    map.addControl(new mapboxgl.FullscreenControl())
    map.addControl(new mapboxgl.NavigationControl())
  }
}
</script>
<style lang="scss">
@import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css";
#map{
  width: 100%;
  height: 100vh;
  position: absolute; top: 0; bottom: 0;
}

.list__card{
  width:28vw;
  height:400px;
  position:absolute;
  top:3vh;
  left:2vw;
  border-radius:10px !important;
}

.search__toolbar{
  box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px -5px rgba(0, 0, 0, 0.14), 0px 1px 10px -5px rgba(0, 0, 0, 0.12);
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
</style>
