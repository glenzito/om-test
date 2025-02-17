const express = require("express")
const swaggerUi = require("swagger-ui-express")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const swaggerSpec = require("./swagger")
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/test", (req, res) => {
  res.json({ message: "Server is running" })
})

const countryRoutes = require("./routes/countryRoutes")
app.use("/countries", countryRoutes)

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

module.exports = app

