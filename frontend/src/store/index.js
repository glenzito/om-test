import { createStore } from "vuex"

// Use the environment variable with a fallback
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000"

const store = createStore({
  state: {
    countries: [],
    countryDetails: null,
    loading: false,
    error: null,
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries
    },
    setCountryDetails(state, details) {
      state.countryDetails = details
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      commit("setLoading", true)
      commit("setError", null)
      try {
        console.log("Fetching from:", `${apiBaseUrl}/countries`)
        const response = await fetch(`${apiBaseUrl}/countries`)

        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`)
        }

        const data = await response.json()
        console.log("Received data:", data)

        commit("setCountries", data)
      } catch (error) {
        console.error("Error fetching countries:", error)
        commit("setError", `Failed to load countries: ${error.message}`)
      } finally {
        commit("setLoading", false)
      }
    },

    async fetchCountryDetails({ commit }, countryName) {
      commit("setLoading", true)
      commit("setError", null)
      try {
        const response = await fetch(`${apiBaseUrl}/countries/${encodeURIComponent(countryName)}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch country details: ${response.status}`)
        }

        const data = await response.json()
        commit("setCountryDetails", data)
      } catch (error) {
        console.error("Error fetching country details:", error)
        commit("setError", `Failed to load country details: ${error.message}`)
      } finally {
        commit("setLoading", false)
      }
    },
  },
  getters: {
    getCountries: (state) => state.countries,
    getCountryDetails: (state) => state.countryDetails,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
})

export default store

