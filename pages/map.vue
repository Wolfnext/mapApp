<template>
  <v-layout
    column
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
     <filterPrice :visibleFeatures="visibleFeatures" />
     <roomBath />
     <policies />
   </v-row>
 </div>
 <div class="hide__scroll">
   <div class="scroll__content" v-if="!loadingData && listFilterResult">
     <advertTile
     :key="index"
     v-for="(advert,index) in listFilterResult.features"
     :activeId="activeId"
     :advertClick="flyToPoint"
     :advertData="advert.properties"
     :advertAllData="advert"></advertTile>
</div>

</div>
  </v-card>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import filterPrice from '@/components/filterPrice.vue'
import roomBath from '@/components/roomBath.vue'
import policies from '@/components/policies.vue'
import advertTile from '@/components/advertTile.vue'
export default {
  computed: {
    ...mapState(['filterData'])
  },
  data () {
    return {
      imageMarkerPopup: { pricePopup: 'chatbox.png' },
      visibleFeatures: [],
      dataPlace: this.placeData,
      mapPlace: this.placeData,
      listFilterResult: this.placeData,
      activeId: null,
      incrementAnimationPrice: false,
      map: null,
      loadingData: true
    }
  },
  components: { filterPrice, roomBath, policies, advertTile },
  mounted () {
    /*eslint-disable */
    this.$store.watch(
    (state)=>{
    return this.$store.state.filterData
  },
  (newValue, oldValue)=>{
      this.dataPlace = JSON.parse(JSON.stringify(newValue))
      this.mapPlace = JSON.parse(JSON.stringify(newValue))
      this.listFilterResult = JSON.parse(JSON.stringify(newValue)) 
      if (this.map)this.map.getSource('points').setData(this.mapPlace);
  },
//Optional Deep if you need it
    {
      deep:true
    }
  )
    this.$store.dispatch('getDataFromApi').then((data) => { 
      this.dataPlace = JSON.parse(JSON.stringify(this.filterData))
      this.mapPlace = JSON.parse(JSON.stringify(this.filterData))
      this.listFilterResult = JSON.parse(JSON.stringify(this.filterData)) 
      this.loadingData = false
      if (!this.loadingData) { this.initializeMap() }
    })

  },
  methods: {
    initializeMap(){
      const recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.2/mapbox-gl-geocoder.min.js')
      document.head.appendChild(recaptchaScript)
      const mapGL = require('mapbox-gl/dist/mapbox-gl.js')
      const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')
      mapGL.accessToken = 'pk.eyJ1IjoiYWRpb3NhZGlrIiwiYSI6ImNrOGVkNGczMDBoaTUzaG4xOXhybnRnNXMifQ.m4Wm5gaZU0UQUssmkJ5Zkg'
      var map = new mapGL.Map({
        container: 'map',
        style: 'mapbox://styles/adiosadik/ck8g6ihln3okb1iofh7v8z2rg',
        center: [-79.955627, 40.412224], // starting position
        zoom: 7 // starting zoom
      })
      map.addControl(new mapGL.FullscreenControl())
      map.addControl(new mapGL.NavigationControl())

      const geocoder = new MapboxGeocoder({
        accessToken: mapGL.accessToken,
        mapboxgl: mapGL
     })
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
      this.map = map;
/*eslint-disable */

loadImages(this.imageMarkerPopup, (loadedImages) => {
  map.on('load', () => {
  map.addImage('pricePopup', loadedImages['pricePopup'], {
    stretchX: [
      [0, 80],
      [95, 130]
    ],
    stretchY: [[0, 50]],
    content: [70,80, 160, 110],
    pixelRatio: 2
});

 
map.addSource('points', {
'type': 'geojson',
'data': this.mapPlace
});
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'points',
'layout': {
'text-field': ['get', 'price'],
'icon-text-fit': 'both',
'icon-image': ['get', 'image-name'],
'icon-allow-overlap': true,
'text-allow-overlap': true
},
"paint": {
   'text-color': "#fff"
}
});


map.on('mouseenter', 'points', function() {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('render', () => {
const features = map.queryRenderedFeatures({ layers: ['points'] })
if (features) {
this.visibleFeatures = features
let tempData =  JSON.parse(JSON.stringify(this.dataPlace.features))
let tempArray = [];
 features.forEach((item)=>{
 tempData.forEach((staticData,index) =>{
  if(item.properties.id == staticData.properties.id)tempArray.push(tempData[index]) }) 
})
 this.listFilterResult.features = tempArray
}
});
 
});
});

function loadImages(urls, callback) {
let results = {}
for (let name in urls) {
  map.loadImage(urls[name], makeCallback(name));
}
 
function makeCallback(name) {
return function(err, image) {
results[name] = err ? null : image;
if (Object.keys(results).length === Object.keys(urls).length) {
    callback(results);
}
}
}
}

},

increacePrice(data){
  this.mapPlace.features.forEach((item,index) => {
    if(item.properties.id === data.properties.id){
      item.properties.price = '0'
      let priceMax = parseInt(this.dataPlace.features[index].properties.price.match(/\d+/g).map(Number))
      const interval = setInterval(() => {
      let price = parseInt(item.properties.price.match(/\d+/g).map(Number))
      if(price < priceMax){
        price+=2
        item.properties.price = item.properties.currency + price 
        this.map.getSource('points').setData(this.mapPlace);            
        }else{
          clearInterval(interval)
          item.properties.price = item.properties.currency + priceMax 
          this.map.getSource('points').setData(this.mapPlace);
         }
    }, 5)
  }
  })

},
flyToPoint(data){
  this.increacePrice(data)
  this.map.flyTo({
    zoom: 13,
    center: data.geometry.coordinates,
    essential: true 
});

    },
  }
}
</script>
<style lang="scss">
#map{
z-index:1;
}
.marker{
  cursor:pointer;
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
  z-index:0;
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
  z-index:100;
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
    z-index:1;
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
