
const express = require("express");
const router = express.Router();

const {
  createLang,
  getLangs,
  getLangById,
  updateLang,
  searchLang,
  deleteLang,
} = require("../controllers/langController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createLangSchema,
  updateLangSchema,
} = require("../validations/langValidation");

/**
 * @swagger
 * tags:
 *   - name: Lang
 *     description: Lang management endpoints
 */

/**
 * @swagger
 * /api/lang:
 *   post:
 *     summary: Create lang
 *     tags: [Lang]
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
 *         description: Lang created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createLangSchema), createLang);

/**
 * @swagger
 * /api/lang/search:
 *   get:
 *     summary: Search lang records
 *     tags: [Lang]
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
router.get("/search", searchLang);

/**
 * @swagger
 * /api/lang:
 *   get:
 *     summary: Get all lang records
 *     tags: [Lang]
 *     responses:
 *       200:
 *         description: Lang list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getLangs);

/**
 * @swagger
 * /api/lang/{id}:
 *   get:
 *     summary: Get lang by id
 *     tags: [Lang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lang found
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getLangById);

/**
 * @swagger
 * /api/lang/{id}:
 *   put:
 *     summary: Update lang
 *     tags: [Lang]
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
 *         description: Lang updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateLangSchema), updateLang);

/**
 * @swagger
 * /api/lang/{id}:
 *   delete:
 *     summary: Delete lang
 *     tags: [Lang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lang deleted successfully
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteLang);

module.exports = router;
