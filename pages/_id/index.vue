<template>
  <div v-if="coin">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8">
        <v-row>
          <v-breadcrumbs :items="path"></v-breadcrumbs>
        </v-row>
        <v-card class="d-flex mt-5">
          <div class="pa-2">
            <v-img max-width="200px" :src="coin.image.large"></v-img>
          </div>
          <div class="ml-2">
            <v-card-title class="text-h5">{{coin.name}}</v-card-title>
            <v-card-subtitle class="">{{coin.symbol}}</v-card-subtitle>
            <v-card-text v-if="coinChart.total_volumes">
              Объём торгов (24ч):
              <span class="primary--text">
                {{totalVolume/getUSDT}} USDT
              </span>
              <br>
              Рыночная капитализация:
              <span class="primary--text">
                {{coin.market_data.market_cap.usd/getUSDT}} USDT
              </span>
            </v-card-text>
          </div>
        </v-card>
        <v-card
          class="mx-auto mt-4"
          color=""
          elevation="4"
        >
          <v-tabs
            v-model="range"
            background-color="transparent"
            grow
          >
            <v-tab v-for="item of days" :key="item.text">{{item.text}}</v-tab>
          </v-tabs>
          <div class="pa-2">
            <BarChart :chartData="chart" :chart-options="chartOptions"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-row v-else justify="center" align="center">
    <v-container class="d-flex flex-column pt-5 justify-center align-center">
      <v-progress-circular
        class="mx-auto"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <div class="text-h5 mt-4">Загрузка данных...</div>
    </v-container>
  </v-row>


</template>

<script>
import {mapGetters} from "vuex";
import Chart from 'chart.js/auto';
import BarChart from '~/components/BarChart.vue'

export default {
  name: "index",
  components: {
    BarChart
  },
  data(){
    return{
      range: '1',
      days: [
        {
          text: '24 часа',
          value: '1'
        },
        {
          text: '7 дней',
          value: '7'
        },
        {
          text: 'Месяц',
          value: '30'
        }
      ],
      coin: false,
      coinChart: [],
      coinChartUSDT: [],
      totalVolume: '',
      chartOptions: {
        responsive: true,
        dots: false,
        maintainAspectRatio: false
      },
      path: [
        {
          text: 'gecko',
          to: '/'
        }
      ]
    }
  },
  beforeCreate() {
    this.$axios.get(`coins/${this.$route.params.id}/`)
      .then(res=> {
        this.coin = res.data
        console.log(res.data)
        this.path.push({
          text: this.coin.id,
          path: this.coin.name
        })
      })
    this.$axios.get(`coins/tether/market_chart?vs_currency=usd&days=1`)
      .then(res=> {
        this.coinChartUSDT = res.data
      })
    this.$axios.get(`coins/${this.$route.params.id}/market_chart?vs_currency=usd&days=1`)
      .then(res=> {
        this.coinChart = res.data
        this.totalVolume = this.coinChart.total_volumes[this.coinChart.total_volumes.length-1][1]
        console.log(res.data)
      })
  },
  computed:{
    ...mapGetters('coins', ['getUSDT']),
    chart(){
      let result = {
        labels: [],
        datasets: [{
          label: 'Курс к USDT',
          backgroundColor: '#77b7cd',
          borderColor: '#016785',
          pointRadius: 2,
          data: []
        }]
      }
      for(let i in this.coinChart.prices){
        let label = this.days[this.range].value == '1' ? new Date(this.coinChart.prices[i][0]).toLocaleTimeString() : new Date(this.coinChart.prices[i][0]).toLocaleString()
        result.labels.push(label)
        result.datasets[0].data.push(this.coinChart.prices[i][1]/this.getUSDT)
      }
      return result
    }
  },
  watch:{
    range(){
      this.$axios.get(`coins/${this.$route.params.id}/market_chart?vs_currency=usd&days=${this.days[this.range].value}`)
        .then(res=> {
          this.coinChart = res.data
            console.log(res.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
