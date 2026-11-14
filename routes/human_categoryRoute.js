
const express = require("express");
const router = express.Router();

const {
  createHumanCategory,
  getHumanCategorys,
  getHumanCategoryById,
  updateHumanCategory,
  searchHumanCategory,
  deleteHumanCategory,
} = require("../controllers/human_categoryController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createHumanCategorySchema,
  updateHumanCategorySchema,
} = require("../validations/human_categoryValidation");

/**
 * @swagger
 * tags:
 *   - name: Human Category
 *     description: Human Category management endpoints
 */

/**
 * @swagger
 * /api/human_category:
 *   post:
 *     summary: Create human category
 *     tags: [Human Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - start_age
 *               - finish_age
 *               - gender_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               start_age:
 *                 type: integer
 *                 example: 18
 *               finish_age:
 *                 type: integer
 *                 example: 60
 *               gender_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Human Category created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createHumanCategorySchema),
  createHumanCategory
);

/**
 * @swagger
 * /api/human_category/search:
 *   get:
 *     summary: Search human category records
 *     tags: [Human Category]
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
router.get("/search", searchHumanCategory);

/**
 * @swagger
 * /api/human_category:
 *   get:
 *     summary: Get all human category records
 *     tags: [Human Category]
 *     responses:
 *       200:
 *         description: Human Category list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getHumanCategorys);

/**
 * @swagger
 * /api/human_category/{id}:
 *   get:
 *     summary: Get human category by id
 *     tags: [Human Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Human Category found
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getHumanCategoryById);

/**
 * @swagger
 * /api/human_category/{id}:
 *   put:
 *     summary: Update human category
 *     tags: [Human Category]
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
 *               start_age:
 *                 type: integer
 *                 example: 18
 *               finish_age:
 *                 type: integer
 *                 example: 60
 *               gender_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Human Category updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateHumanCategorySchema),
  updateHumanCategory
);

/**
 * @swagger
 * /api/human_category/{id}:
 *   delete:
 *     summary: Delete human category
 *     tags: [Human Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Human Category deleted successfully
 *       404:
 *         description: Human Category not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteHumanCategory);

module.exports = router;
