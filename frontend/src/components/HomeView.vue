<template>
  <div class="home p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Countries of the World</h1>
    <div class="flag-grid grid grid-cols-auto-fill gap-6 p-4">
      <div 
        v-for="country in countries" 
        :key="country.name" 
        class="flag-item cursor-pointer transform transition-transform duration-200 hover:scale-105" 
        @click="goToCountryDetail(country.name)"
      >
        <img 
          :src="country.flag" 
          :alt="country.name" 
          class="flag-image w-36 h-36 object-cover border border-gray-300"
        />
        <p class="text-center mt-2">{{ country.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['getCountries']),
    countries() {
      return this.getCountries;
    }
  },
  methods: {
    ...mapActions(['fetchCountries']),
    goToCountryDetail(countryName) {
      this.$router.push({ name: 'countryDetail', params: { countryName } });
    }
  },
  created() {
    alert("created")
    this.fetchCountries();
  }
}
</script>

<style scoped>
/* Tailwind handles the styles, no need for custom styles here */
</style>
