const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")

const app = express()
const port = process.env.PORT || 3000

// Updated CORS configuration to accept requests from the frontend
app.use(
  cors({
    origin: process.env.VUE_APP_API_BASE_URL || "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())

const swaggerSpec = require("./swagger")
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/test", (req, res) => {
  res.json({ message: "Server is running" })
})

const countryRoutes = require("./routes/countryRoutes")
app.use("/countries", countryRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong, please try again later!")
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

module.exports = app

