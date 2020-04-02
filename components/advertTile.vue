<template>
 <v-card @click="clickAdvert" flat>
    <v-container v-bind:class="{ active: advertData.id === activeId }">
      <v-row>
        <v-col cols="auto">
          <v-img
          class="image__rounded"
            height="100"
            width="100"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>
        </v-col>

        <v-col
          cols="8"
          class=""
        >
        <v-row>
     <v-col cols="12" class="pt-1 pb-0"><span class="title advert__title main__fontFamily">{{advertData.title}}</span></v-col>
       <v-col cols="12" class="pt-0 pb-0"><span class="subtitle advert__address main__fontFamily">{{advertData.address}}</span></v-col>
       <v-col cols="12" class="pt-1 pb-0"><span class="title advert__price main__fontFamily">{{advertData.price}}</span></v-col>
        </v-row>
        </v-col>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['advertData', 'activeId', 'advertClick', 'advertAllData'],
  methods: {
    clickAdvert () {
      this.advertClick(this.advertAllData)
    }
  }
}
</script>

<style>
.active{
  background-color: rgba(50,140,90,0.4);
}
.image__rounded{
  border-radius: 3px;
}

.advert__title{
  color:#55928b;
}

.advert__subtitle{
  color:grey;
}
.advert__price{
}
</style>
