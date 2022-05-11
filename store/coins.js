export const state = () => ({
  coins: [],
  usdt: 0
})

export const actions = {
  setCoins({commit}) {
    return new Promise((resolve, reject)=>{
      this.$axios.get('coins/').then(res=>{
        commit('setCoins', res.data)
        resolve(res.data)
      })
    })
  },
  setUSDT({commit}) {
    return new Promise((resolve, reject)=>{
      this.$axios.get('coins/tether').then(res=>{
        let usdt = res.data.market_data.current_price.usd
        resolve(usdt)
        commit("setUSDT", usdt)
      })
    })
  }
}

export const mutations = {
  setCoins(state, coins){
    state.coins = coins
  },
  setUSDT(state, USDT){
    state.usdt = USDT
  }
}
export const getters = {
  getUSDT: s => s.usdt
}
