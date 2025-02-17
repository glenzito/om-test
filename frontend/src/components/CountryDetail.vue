<template>
    <div class="country-detail" v-if="countryDetails">
      <h1>{{ countryDetails.name }}</h1>
      <img :src="countryDetails.flag" :alt="countryDetails.name" class="flag-image">
      <div class="details">
        <p><strong>Population:</strong> {{ countryDetails.population.toLocaleString() }}</p>
        <p><strong>Capital:</strong> {{ countryDetails.capital }}</p>
      </div>
      <button @click="goBack"><< Go back</button>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'CountryDetailView',
    computed: {
      ...mapGetters(['getCountryDetails']),
      countryDetails() {
        return this.getCountryDetails;
      }
    },
    methods: {
      ...mapActions(['fetchCountryDetails']),
      goBack() {
        this.$router.push({ name: 'home' });
      }
    },
    created() {
      const countryName = this.$route.params.countryName;
      this.fetchCountryDetails(countryName);
    }
  }
  </script>
  
  <style scoped>
  .country-detail {
    padding: 20px;
  }
  
  .flag-image {
    max-width: 300px;
    border: 1px solid #ddd;
  }
  
  .details {
    margin-top: 20px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  
  