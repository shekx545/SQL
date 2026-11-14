
const express = require("express");
const router = express.Router();

const {
  createTypes,
  getTypess,
  getTypesById,
  updateTypes,
  searchTypes,
  deleteTypes,
} = require("../controllers/typesController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createTypesSchema,
  updateTypesSchema,
} = require("../validations/typesValidation");

/**
 * @swagger
 * tags:
 *   - name: Types
 *     description: Types management endpoints
 */

/**
 * @swagger
 * /api/types:
 *   post:
 *     summary: Create types
 *     tags: [Types]
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
 *         description: Types created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createTypesSchema), createTypes);

/**
 * @swagger
 * /api/types/search:
 *   get:
 *     summary: Search types records
 *     tags: [Types]
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
router.get("/search", searchTypes);

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Get all types records
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: Types list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getTypess);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     summary: Get types by id
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Types found
 *       404:
 *         description: Types not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTypesById);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     summary: Update types
 *     tags: [Types]
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
 *         description: Types updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Types not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateTypesSchema), updateTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     summary: Delete types
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Types deleted successfully
 *       404:
 *         description: Types not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteTypes);

module.exports = router;
