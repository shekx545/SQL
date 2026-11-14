
const express = require("express");
const router = express.Router();

const countryController = require("../controllers/countryController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCountrySchema,
  updateCountrySchema,
} = require("../validations/countryValidation");

/**
 * @swagger
 * tags:
 *   - name: Country
 *     description: Country management endpoints
 */

/**
 * @swagger
 * /api/country:
 *   post:
 *     summary: Create country
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_name
 *             properties:
 *               country_name:
 *                 type: string
 *                 example: "Uzbekistan"
 *     responses:
 *       201:
 *         description: Country created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createCountrySchema),
  countryController.createCountry
);

/**
 * @swagger
 * /api/country/search:
 *   get:
 *     summary: Search country records
 *     tags: [Country]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "a"
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing or invalid search query
 *       500:
 *         description: Server error
 */
router.get("/search", countryController.searchCountry);

/**
 * @swagger
 * /api/country:
 *   get:
 *     summary: Get all country records
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Country list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", countryController.getCountrys);

/**
 * @swagger
 * /api/country/{id}:
 *   get:
 *     summary: Get country by id
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Country found
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.get("/:id", countryController.getCountryById);

/**
 * @swagger
 * /api/country/{id}:
 *   put:
 *     summary: Update country
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *                 example: "Uzbekistan"
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCountrySchema),
  countryController.updateCountry
);

/**
 * @swagger
 * /api/country/{id}:
 *   delete:
 *     summary: Delete country
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", countryController.deleteCountry);

module.exports = router;
