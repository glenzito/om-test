const express = require("express")
const router = express.Router()
const countriesController = require("../controllers/countriesController")

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         flag:
 *           type: string
 *         population:
 *           type: number
 *         capital:
 *           type: string
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     description: Retrieve a list of all countries
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
router.get("/", countriesController.getAllCountries)

/**
 * @swagger
 * /countries/{name}:
 *   get:
 *     summary: Retrieve details about a specific country
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details about the country
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: Country not found
 */
router.get("/:name", countriesController.getCountryDetails)

module.exports = router

