
const express = require("express");
const router = express.Router();

const {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  searchFlat,
  deleteFlat,
} = require("../controllers/flatController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createFlatSchema,
  updateFlatSchema,
} = require("../validations/flatValidation");

/**
 * @swagger
 * tags:
 *   - name: Flat
 *     description: Flat management endpoints
 */

/**
 * @swagger
 * /api/flat:
 *   post:
 *     summary: Create flat
 *     tags: [Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - etaj
 *             properties:
 *               etaj:
 *                 type: integer
 *                 example: 5
 *               condition:
 *                 type: string
 *                 example: "Yaxshi tamirlangan"
 *     responses:
 *       201:
 *         description: Flat created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createFlatSchema), createFlat);

/**
 * @swagger
 * /api/flat/search:
 *   get:
 *     summary: Search flat records
 *     tags: [Flat]
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
router.get("/search", searchFlat);

/**
 * @swagger
 * /api/flat:
 *   get:
 *     summary: Get all flat records
 *     tags: [Flat]
 *     responses:
 *       200:
 *         description: Flat list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getFlats);

/**
 * @swagger
 * /api/flat/{id}:
 *   get:
 *     summary: Get flat by id
 *     tags: [Flat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Flat found
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getFlatById);

/**
 * @swagger
 * /api/flat/{id}:
 *   put:
 *     summary: Update flat
 *     tags: [Flat]
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
 *               etaj:
 *                 type: integer
 *                 example: 5
 *               condition:
 *                 type: string
 *                 example: "Yaxshi tamirlangan"
 *     responses:
 *       200:
 *         description: Flat updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateFlatSchema), updateFlat);

/**
 * @swagger
 * /api/flat/{id}:
 *   delete:
 *     summary: Delete flat
 *     tags: [Flat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Flat deleted successfully
 *       404:
 *         description: Flat not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteFlat);

module.exports = router;
