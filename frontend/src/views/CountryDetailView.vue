<template>
    <div class="country-detail" v-if="countryDetails">
      <h1>{{ countryDetails.name.common }}</h1>
      <p>Name of Country: {{ countryDetails.name }}</p>
      <p>Capital City : {{ countryDetails.capital ? countryDetails.capital : 'N/A' }}</p>
      <p>Population size: {{ countryDetails.population }}</p>
      <router-link to="/"> Go back</router-link>
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
  
  