const countryService = require("../services/countryService")

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await countryService.getAllCountries()
    res.status(200).json(countries)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

exports.getCountryDetails = async (req, res) => {
  const { name } = req.params
  try {
    const countryDetails = await countryService.getCountryDetails(name)
    if (!countryDetails) {
      return res.status(404).json({ message: "Country not found" })
    }
    res.status(200).json(countryDetails)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

