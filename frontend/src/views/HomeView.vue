<template>
  <div class="home max-w-7xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Countries of the World</h1>


    <div v-if="error" class="error-message text-center mb-8">
      <p class="text-red-600 bg-red-100 p-4 rounded-lg mb-4">{{ error }}</p>
      <button 
        @click="retryLoading" 
        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>


    <div v-else-if="loading" class="loading-state flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    
    <div v-else class="countries-grid grid grid-cols-auto-fill gap-6 p-4">
      <div 
        v-for="country in countries" 
        :key="country.name"
        class="country-card cursor-pointer"
        @click="goToCountryDetail(country.name)"
      >
        <div class="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img 
            :src="country.flag" 
            :alt="`Flag of ${country.name}`"
            class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
            <h2 class="text-lg font-semibold truncate">{{ country.name }}</h2>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error && countries.length === 0" class="no-countries text-center py-8">
      <p class="text-gray-600">No countries found.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      loading: 'isLoading',
      error: 'getError'
    })
  },
  methods: {
    ...mapActions(['fetchCountries']),
    goToCountryDetail(countryName) {
      this.$router.push({ 
        name: 'countryDetail', 
        params: { countryName }
      });
    },
    retryLoading() {
      this.fetchCountries();
    }
  },
  created() {
    this.fetchCountries();
  }
}
</script>

<style scoped>
/* Tailwind handles the styles, no need for custom styles here */
</style>
