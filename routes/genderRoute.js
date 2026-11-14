
const express = require("express");
const router = express.Router();

const {
  createGender,
  getGenders,
  getGenderById,
  updateGender,
  searchGender,
  deleteGender,
} = require("../controllers/genderController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createGenderSchema,
  updateGenderSchema,
} = require("../validations/genderValidation");

/**
 * @swagger
 * tags:
 *   - name: Gender
 *     description: Gender management endpoints
 */

/**
 * @swagger
 * /api/gender:
 *   post:
 *     summary: Create gender
 *     tags: [Gender]
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
 *         description: Gender created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createGenderSchema), createGender);

/**
 * @swagger
 * /api/gender/search:
 *   get:
 *     summary: Search gender records
 *     tags: [Gender]
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
router.get("/search", searchGender);

/**
 * @swagger
 * /api/gender:
 *   get:
 *     summary: Get all gender records
 *     tags: [Gender]
 *     responses:
 *       200:
 *         description: Gender list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getGenders);

/**
 * @swagger
 * /api/gender/{id}:
 *   get:
 *     summary: Get gender by id
 *     tags: [Gender]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Gender found
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getGenderById);

/**
 * @swagger
 * /api/gender/{id}:
 *   put:
 *     summary: Update gender
 *     tags: [Gender]
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
 *         description: Gender updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateGenderSchema), updateGender);

/**
 * @swagger
 * /api/gender/{id}:
 *   delete:
 *     summary: Delete gender
 *     tags: [Gender]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Gender deleted successfully
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteGender);

module.exports = router;
