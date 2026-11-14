
const express = require("express");
const router = express.Router();

const {
  createVenueType,
  getVenueTypes,
  getVenueTypeById,
  updateVenueType,
  searchVenueType,
  deleteVenueType,
} = require("../controllers/venue_typeController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createVenueTypeSchema,
  updateVenueTypeSchema,
} = require("../validations/venue_typeValidation");

/**
 * @swagger
 * tags:
 *   - name: Venue Type Link
 *     description: Venue Type Link management endpoints
 */

/**
 * @swagger
 * /api/venue_type:
 *   post:
 *     summary: Create venue type link
 *     tags: [Venue Type Link]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venue_id
 *               - type_id
 *             properties:
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Venue Type Link created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createVenueTypeSchema), createVenueType);

/**
 * @swagger
 * /api/venue_type/search:
 *   get:
 *     summary: Search venue type link records
 *     tags: [Venue Type Link]
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
router.get("/search", searchVenueType);

/**
 * @swagger
 * /api/venue_type:
 *   get:
 *     summary: Get all venue type link records
 *     tags: [Venue Type Link]
 *     responses:
 *       200:
 *         description: Venue Type Link list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getVenueTypes);

/**
 * @swagger
 * /api/venue_type/{id}:
 *   get:
 *     summary: Get venue type link by id
 *     tags: [Venue Type Link]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue Type Link found
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getVenueTypeById);

/**
 * @swagger
 * /api/venue_type/{id}:
 *   put:
 *     summary: Update venue type link
 *     tags: [Venue Type Link]
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
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Venue Type Link updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateVenueTypeSchema), updateVenueType);

/**
 * @swagger
 * /api/venue_type/{id}:
 *   delete:
 *     summary: Delete venue type link
 *     tags: [Venue Type Link]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue Type Link deleted successfully
 *       404:
 *         description: Venue Type Link not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteVenueType);

module.exports = router;
