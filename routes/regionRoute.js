
const express = require("express");
const router = express.Router();

const {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  searchRegion,
  deleteRegion,
} = require("../controllers/regionController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createRegionSchema,
  updateRegionSchema,
} = require("../validations/regionValidation");

/**
 * @swagger
 * tags:
 *   - name: Region
 *     description: Region management endpoints
 */

/**
 * @swagger
 * /api/region:
 *   post:
 *     summary: Create region
 *     tags: [Region]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *     responses:
 *       201:
 *         description: Region created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createRegionSchema), createRegion);

/**
 * @swagger
 * /api/region/search:
 *   get:
 *     summary: Search region records
 *     tags: [Region]
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
router.get("/search", searchRegion);

/**
 * @swagger
 * /api/region:
 *   get:
 *     summary: Get all region records
 *     tags: [Region]
 *     responses:
 *       200:
 *         description: Region list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getRegions);

/**
 * @swagger
 * /api/region/{id}:
 *   get:
 *     summary: Get region by id
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Region found
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getRegionById);

/**
 * @swagger
 * /api/region/{id}:
 *   put:
 *     summary: Update region
 *     tags: [Region]
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
 *     responses:
 *       200:
 *         description: Region updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateRegionSchema), updateRegion);

/**
 * @swagger
 * /api/region/{id}:
 *   delete:
 *     summary: Delete region
 *     tags: [Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteRegion);

module.exports = router;
