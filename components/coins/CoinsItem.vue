<template>
  <v-card
    min-height="100px"
    hover
    nuxt
    :to="item.id"
    class="d-flex justify-space-between align-center"
  >
    <div>
      <v-img class="ma-2" width="70px" contain :src="item.image.large"/>
    </div>
    <div>
      <v-card-title>
        {{item.name}}
      </v-card-title>
      <v-card-subtitle>
        {{item.symbol}}
      </v-card-subtitle>
    </div>
    <v-spacer></v-spacer>
    <div class="pa-4 d-flex primary--text">
      {{(item.market_data.current_price.usd / getUSDT).toFixed(5)}}
      &nbsp
      <span class="font-weight-bold mr-2">
        USDT
      </span>
      <v-icon v-if="item.market_data.price_change_24h<0" color="error ml-4">
        mdi-arrow-down-drop-circle
      </v-icon>
      <v-icon v-else color="success ml-4">
        mdi-arrow-up-drop-circle
      </v-icon>
    </div>
  </v-card>
</template>

<script>
import {mapGetters}from 'vuex'
export default {
  name: "CoinsItem",
  props:{
    item: {}
  },
  computed:{
    ...mapGetters('coins', ['getUSDT'])
  }
}
</script>


