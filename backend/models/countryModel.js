// using POJO instead of mongoose :-)
const Country = {
    create: (name, flag, population = null, capital = null) => ({
      name,
      flag,
      population,
      capital,
    }),
  
    createFromAPI: function (apiData) {
      return this.create(
        apiData.name.common,
        apiData.flags.svg || apiData.flags.png,
        apiData.population,
        apiData.capital ? apiData.capital[0] : "No capital found",
      )
    },
  }
  
  module.exports = Country
  
  