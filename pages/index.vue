<template>
  <v-row justify="center" align="center">
    <v-col id="top" cols="12" sm="10" md="8">
      <Search @search="search=$event" class="mt-5"></Search>
      <Filters @submitSort="filters=$event" class="mb-4" :sort-items="sortItems"></Filters>
      <div v-if="coins.length!=0">
        <div v-if="filteredCoins.length!=0">
          <CoinsItem class="mb-3" v-for="(item, index) in filteredCoins" :key="index" :item="item"></CoinsItem>
        </div>
        <v-alert
          v-else
          border="bottom"
          color="error"
          dark
        >
          Не обнаружено совпадений
        </v-alert>

      </div>
      <div v-else>
        <v-sheet v-for="i in 5" class="pb-3" :key="i">
          <v-skeleton-loader
            class="mx-auto"
            height="100"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </div>
      <div v-if="!searching && showButton" class="d-flex justify-center">
        <v-btn color="primary" v-if="toShow<coins.length" @click="showMore">Показать ещё</v-btn>
        <v-btn color="primary" v-else href="#top" @click="toShow=5">Скрыть</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Search from "~/components/UI/Search";
import CoinsItem from "~/components/coins/CoinsItem";
import Filters from "~/components/UI/Filters";
import {mapGetters} from "vuex";
export default {
  components: {
    CoinsItem, Search, Filters
  },

  data(){
    return{
      coins: [],
      toShow: 5,
      usdt: 0,
      search: '',
      showButton: true,
      searching: false,
      filters: {
        priceArea: [0, 100000],
        sortBy: null,
        reverse: false
      },
      sortItems: [
        {
          value: 'name',
          text: 'Имени'
        },
        {
          value: 'price',
          text: 'Цене'
        },
      ]
    }
  },
  beforeCreate(){
    this.$store.dispatch('coins/setCoins').then(res=> {
      this.coins = res
      console.log(res)
    })
  },
  methods:{
    showMore(){
      if(this.toShow < this.coins.length){
        this.toShow+5 <= this.coins.length ? this.toShow+=5 : this.toShow = this.coins.length
      }
    }
  },
  computed:{
    ...mapGetters('coins', ['getUSDT']),
    filteredCoins(){
      let coins = [...this.coins]
      if(this.filters.sortBy=='price'){
        coins = coins.sort((a,b)=>{
          return a.market_data.current_price.usd - b.market_data.current_price.usd
        })
      }else if(this.filters.sortBy=='name'){
        coins = coins.sort((a,b)=>{
          return a.name.localeCompare(b.name)
        })
      }
      coins = coins.filter(item=>{
        return item.market_data.current_price.usd / this.getUSDT > this.filters.priceArea[0]
      })
      coins = this.filters.reverse ? coins.reverse().slice(0,this.toShow) : coins.slice(0,this.toShow)
      if(this.search){
        this.searching=true
        return coins.filter(item=>{
          return item.name.toLowerCase().trim().includes(this.search.toLowerCase().trim())
        })
      }
      this.searching = false
      if (coins.length<this.toShow) {
        this.showButton=false
      }
      else{
        this.showButton=true
      }
      return coins
    }
  }

}
</script>
