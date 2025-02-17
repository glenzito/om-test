const axios = require("axios")
const Country = require("../models/countryModel")

exports.getAllCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all")
    return response.data.map((country) => ({
      name: country.name.common,
      flag: country.flags.svg || country.flags.png,
    }))
  } catch (error) {
    console.error("Error fetching all countries:", error)
    throw new Error("Failed to fetch countries")
  }
}

exports.getCountryDetails = async (name) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
    if (response.data.length === 0) {
      return null
    }
    const country = response.data[0]
    return {
      name: country.name.common,
      flag: country.flags.svg || country.flags.png,
      population: country.population,
      capital: country.capital ? country.capital[0] : "No capital",
    }
  } catch (error) {
    console.error("Error fetching country details:", error)
    if (error.response && error.response.status === 404) {
      return null
    }
    throw new Error("Failed to fetch country details")
  }
}

