<template>
    <div class="country-detail" v-if="countryDetails">
      <h1>{{ countryDetails.name.common }}</h1>
      <p>Capital: {{ countryDetails.capital ? countryDetails.capital[0] : 'N/A' }}</p>
      <p>Population: {{ countryDetails.population }}</p>
      <p>Region: {{ countryDetails.region }}</p>
      <router-link to="/">Back to Countries List</router-link>
    </div>
    <div v-else>please wait</div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'CountryDetailView',
    computed: {
      ...mapState(['countryDetails'])
    },
    methods: {
      ...mapActions(['fetchCountryDetails'])
    },
    created() {
      this.fetchCountryDetails(this.$route.params.countryName)
    }
  }
  </script>
  
  