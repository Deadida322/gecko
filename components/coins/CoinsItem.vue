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
    <div class="pa-2 primary--text">
      {{(item.market_data.current_price.usd / getUSDT).toFixed(5)}}
      <span class="font-weight-bold">
        USDT
      </span>
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


