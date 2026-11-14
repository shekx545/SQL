
const express = require("express");
const router = express.Router();

const {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  searchDistrict,
  deleteDistrict,
} = require("../controllers/districtController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createDistrictSchema,
  updateDistrictSchema,
} = require("../validations/districtValidation");

/**
 * @swagger
 * tags:
 *   - name: District
 *     description: District management endpoints
 */

/**
 * @swagger
 * /api/district:
 *   post:
 *     summary: Create district
 *     tags: [District]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - region_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               region_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: District created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createDistrictSchema),
  createDistrict
);

/**
 * @swagger
 * /api/district/search:
 *   get:
 *     summary: Search district records
 *     tags: [District]
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
router.get("/search", searchDistrict);

/**
 * @swagger
 * /api/district:
 *   get:
 *     summary: Get all district records
 *     tags: [District]
 *     responses:
 *       200:
 *         description: District list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getDistricts);

/**
 * @swagger
 * /api/district/{id}:
 *   get:
 *     summary: Get district by id
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: District found
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getDistrictById);

/**
 * @swagger
 * /api/district/{id}:
 *   put:
 *     summary: Update district
 *     tags: [District]
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
 *               region_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: District updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateDistrictSchema),
  updateDistrict
);

/**
 * @swagger
 * /api/district/{id}:
 *   delete:
 *     summary: Delete district
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: District deleted successfully
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteDistrict);

module.exports = router;
