<template>
  <v-layout
    column
    justify-center
    align-center
    light
  >
    <div id="map">
   <v-card class="list__card">
    <div class="toolbar__custom">

        <div
        id="geocoder"
        class="geocoder light">
        </div>

      </div>
      <div class="filterBox" >
        <v-row
        class="mt-1 ml-0 mr-0 "
        align="center"
      >
     <filterPrice />
     <roomBath />
     <policies />
   </v-row>
 </div>
 <div class="hide__scroll">
   <div class="scroll__content">
   <advertTile :key="index" v-for="(advert,index) in advertList" :advertData="advert" />
</div>

</div>
  </v-card>
    </div>
  </v-layout>
</template>

<script>
import $ from 'jquery'
import filterPrice from '@/components/filterPrice.vue'
import roomBath from '@/components/roomBath.vue'
import policies from '@/components/policies.vue'
import advertTile from '@/components/advertTile.vue'
export default {
  data () {
    return {
      advertList: [{ title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }, { title: 'Apartments 2 Bedroom', address: 'OLEXON 12 Street #ted', price: '$200' }],
      dataPlace: this.$store.state.map.placeData
    }
  },
  components: { filterPrice, roomBath, policies, advertTile },
  mounted () {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.min.js')
    document.head.appendChild(recaptchaScript)
    const mapGL = require('mapbox-gl/dist/mapbox-gl.js')
    const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')
    mapGL.accessToken = 'pk.eyJ1IjoiYWRpb3NhZGlrIiwiYSI6ImNrOGVkNGczMDBoaTUzaG4xOXhybnRnNXMifQ.m4Wm5gaZU0UQUssmkJ5Zkg'
    const map = new mapGL.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.955627, 40.412224], // starting position
      zoom: 12 // starting zoom
    })
    map.addControl(new mapGL.FullscreenControl())
    map.addControl(new mapGL.NavigationControl())

    const geocoder = new MapboxGeocoder({
      accessToken: mapGL.accessToken,
      mapboxgl: mapGL
    })

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

    const geojson = this.dataPlace
    console.log(geojson)
    geojson.features.forEach(function (marker) {
      const el = document.createElement('div')
      const markerNumber = document.createElement('span')
      const markerCurrency = document.createElement('span')
      markerNumber.className = 'markerNumber'
      el.className = 'marker'
      const valueNode = document.createTextNode(marker.properties.price)
      const currencyNode = document.createTextNode(marker.properties.currency)
      markerNumber.appendChild(valueNode)
      markerCurrency.appendChild(currencyNode)
      el.appendChild(markerCurrency)
      el.appendChild(markerNumber)
      new mapGL.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map)
    })

    $('.markerNumber').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: (now) => {
          $(this).text(Math.ceil(now))
        }
      })
    })
  }
}
</script>
<style lang="scss">
.marker{
  background-color:#5c4da2;
  border-radius: .4em;
  width:70px;
  height:25px;
  color:white;
  font-family: 'Open Sans', sans-serif;
  font-weight: 900;
  text-align:center;
  padding-top:2px;
  font-size:16px;
webkit-box-shadow: 10px 10px 4px -7px rgba(0,0,0,0.39);
-moz-box-shadow: 10px 10px 4px -7px rgba(0,0,0,0.39);
box-shadow: 10px 10px 4px -7px rgba(0,0,0,0.39);
}

.marker:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #5c4da2;
  border-bottom: 0;
  margin-left: -10px;
  margin-bottom: -10px;
}

@import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css";
@import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.css";
#map{
  width: 100%;
  height: 90vh;
  position: absolute; top: 0; bottom: 0;
}

.list__card{
  width:28vw;
  height:600px;
  position:absolute;
  top:3vh;
  overflow: hidden;
  left:2vw;
  border-radius:10px !important;
}

.geocoder {
z-index: 100000;
width:100%;
padding-top:1.5vh;
margin-left:2vw;
}

.toolbar__custom{
  width:28vw;
  height:8vh;
  background-color:#5e4da9;
  top:11vh;
  left:2vw;
}
.filterBox{
  margin-top:2vh;
}

.hide__scroll{
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.scroll__content{
    margin-top:1vh;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-bottom:15vh;
  }

 .scroll__content::-webkit-scrollbar {
  display: none;
}

.search__toolbar{
  box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px -5px rgba(0, 0, 0, 0.14), 0px 1px 10px -5px rgba(0, 0, 0, 0.12);
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

</style>
