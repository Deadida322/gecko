<template>
  <v-text-field
    solo
    clearable
    @input="search"
    v-model="query"
    label="Поиск криптовалюты"
    hint="Поиск криптовалюты"
    append-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      query: ''
    }
  },
  methods:{
    search(){
      this.$emit('search', this.query)
    }
  }
}
</script>

<style scoped>

</style>
