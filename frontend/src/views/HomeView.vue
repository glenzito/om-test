<template>
  <div class="home">
    <h1 class="title">Countries of the World</h1>
    <div class="flag-grid">
      <div 
        v-for="country in countries" 
        :key="country.name" 
        class="flag-item" 
        @click="goToCountryDetail(country.name)"
      >
        <img 
          :src="country.flag" 
          :alt="country.name" 
          class="flag-image"
        />
        <p class="country-name">{{ country.name }}</p>
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
    this.fetchCountries();
  }
}
</script>

<style scoped>
/* Container for the page */
.home {
  padding: 1rem;
}

/* Title style */
.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Flag grid */
.flag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Individual flag item */
.flag-item {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  text-align: center;
}

.flag-item:hover {
  transform: scale(1.05);
}

/* Flag image */
.flag-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 0.375rem; /* Rounded corners */
}

/* Country name text */
.country-name {
  margin-top: 0.5rem;
  font-size: 1rem;
}
</style>
