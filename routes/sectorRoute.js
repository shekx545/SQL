
const express = require("express");
const router = express.Router();

const {
  createSector,
  getSectors,
  getSectorById,
  updateSector,
  searchSector,
  deleteSector,
} = require("../controllers/sectorController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createSectorSchema,
  updateSectorSchema,
} = require("../validations/sectorValidation");

/**
 * @swagger
 * tags:
 *   - name: Sector
 *     description: Sector management endpoints
 */

/**
 * @swagger
 * /api/sector:
 *   post:
 *     summary: Create sector
 *     tags: [Sector]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sector_name
 *             properties:
 *               sector_name:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Sector created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createSectorSchema), createSector);

/**
 * @swagger
 * /api/sector/search:
 *   get:
 *     summary: Search sector records
 *     tags: [Sector]
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
router.get("/search", searchSector);

/**
 * @swagger
 * /api/sector:
 *   get:
 *     summary: Get all sector records
 *     tags: [Sector]
 *     responses:
 *       200:
 *         description: Sector list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getSectors);

/**
 * @swagger
 * /api/sector/{id}:
 *   get:
 *     summary: Get sector by id
 *     tags: [Sector]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sector found
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSectorById);

/**
 * @swagger
 * /api/sector/{id}:
 *   put:
 *     summary: Update sector
 *     tags: [Sector]
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
 *               sector_name:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Sector updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateSectorSchema), updateSector);

/**
 * @swagger
 * /api/sector/{id}:
 *   delete:
 *     summary: Delete sector
 *     tags: [Sector]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Sector deleted successfully
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSector);

module.exports = router;
