<template>
  <v-row v-if="coins.length!=0" justify="center" align="center">
    <v-col id="top" cols="12" sm="8" md="6">
      <Search class="mt-5"></Search>
      <Filters class="mb-4" :sort-items="sortItems"></Filters>
      <CoinsItem class="mb-3" v-for="(item, index) in filteredCoins" :key="index" :item="item"></CoinsItem>
      <div class="d-flex justify-center">
        <v-btn v-if="toShow<coins.length" @click="showMore">Показать ещё</v-btn>
        <v-btn v-else href="#top" @click="toShow=10">Скрыть</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Search from "~/components/UI/Search";
import CoinsItem from "~/components/coins/CoinsItem";
import Filters from "~/components/UI/Filters";
export default {
  components: {
    CoinsItem, Search, Filters
  },

  data(){
    return{
      coins: [],
      toShow: 10,
      usdt: 0,
      sortItems: [
        'Имени',
        'По цене'
      ]
    }
  },
  beforeCreate(){
    this.$store.dispatch('coins/setUSDT').then(res=>this.usdt = res)
    this.$store.dispatch('coins/setCoins').then(res=> {
      this.coins = res
      console.log(res[2].market_data.current_price.usd)
    })
  },
  methods:{
    showMore(){
      if(this.toShow < this.coins.length){
        this.toShow+10 <= this.coins.length ? this.toShow+=10 : this.toShow = this.coins.length
      }

    }
  },
  computed:{
    filteredCoins(){
      return this.coins.slice(0, this.toShow)
    }
  }

}
</script>
