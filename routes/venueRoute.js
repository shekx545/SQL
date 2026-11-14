
const express = require("express");
const router = express.Router();

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  searchVenue,
  deleteVenue,
} = require("../controllers/venueController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createVenueSchema,
  updateVenueSchema,
} = require("../validations/venueValidation");

/**
 * @swagger
 * tags:
 *   - name: Venue
 *     description: Venue management endpoints
 */

/**
 * @swagger
 * /api/venue:
 *   post:
 *     summary: Create venue
 *     tags: [Venue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - region_id
 *               - district_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               address:
 *                 type: string
 *                 example: "Bunyodkor shoh kochasi"
 *               location:
 *                 type: string
 *                 example: "Toshkent"
 *               site:
 *                 type: string
 *                 example: "https://example.com"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               schema:
 *                 type: string
 *                 example: "{}"
 *               region_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createVenueSchema), createVenue);

/**
 * @swagger
 * /api/venue/search:
 *   get:
 *     summary: Search venue records
 *     tags: [Venue]
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
router.get("/search", searchVenue);

/**
 * @swagger
 * /api/venue:
 *   get:
 *     summary: Get all venue records
 *     tags: [Venue]
 *     responses:
 *       200:
 *         description: Venue list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getVenues);

/**
 * @swagger
 * /api/venue/{id}:
 *   get:
 *     summary: Get venue by id
 *     tags: [Venue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue found
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getVenueById);

/**
 * @swagger
 * /api/venue/{id}:
 *   put:
 *     summary: Update venue
 *     tags: [Venue]
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
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               address:
 *                 type: string
 *                 example: "Bunyodkor shoh kochasi"
 *               location:
 *                 type: string
 *                 example: "Toshkent"
 *               site:
 *                 type: string
 *                 example: "https://example.com"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               schema:
 *                 type: string
 *                 example: "{}"
 *               region_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Venue updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateVenueSchema), updateVenue);

/**
 * @swagger
 * /api/venue/{id}:
 *   delete:
 *     summary: Delete venue
 *     tags: [Venue]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteVenue);

module.exports = router;
