<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Фильтры</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-select v-model="sortBy" label="Сортировать по" :items="sortItems" filled dense/>
        <v-range-slider
          hint="Цена в USDT"
          max="100000"
          min="0.01"
          v-model="priceArea"
        >
          <template v-slot:prepend>
            <v-text-field
              :value="priceArea[0]"
              class="mt-0 pt-0"
              single-line
              type="number"
              style="width: 60px"
              @change="$set(priceArea, 0, $event)"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              :value="priceArea[1]"
              class="mt-0 pt-0"
              single-line
              type="number"
              style="width: 60px"
              @change="$set(priceArea, 1, $event)"
            ></v-text-field>
          </template>
        </v-range-slider>
        <div class="d-flex justify-end">
          <v-btn @click="submitSort" color="primary">Применить</v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
export default {
  name: "Filters",
  props: {
    sortItems: []
  },
  data(){
    return({
      sortBy: '',
      priceArea: [0.01, 100000]
    })
  },
  methods: {
    submitSort(){
      let filters = {
        sortBy: this.sortBy, priceArea: this.priceArea
      }
      console.log(filters)
      this.$emit('submitSort', filters)
    }
  }
}
</script>

<style scoped>

</style>
