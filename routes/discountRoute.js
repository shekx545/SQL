
const express = require("express");
const router = express.Router();

const {
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  searchDiscount,
  deleteDiscount,
} = require("../controllers/discountController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createDiscountSchema,
  updateDiscountSchema,
} = require("../validations/discountValidation");

/**
 * @swagger
 * tags:
 *   - name: Discount
 *     description: Discount management endpoints
 */

/**
 * @swagger
 * /api/discount:
 *   post:
 *     summary: Create discount
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - discount
 *             properties:
 *               discount:
 *                 type: string
 *                 example: "10%"
 *               finish_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *     responses:
 *       201:
 *         description: Discount created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createDiscountSchema),
  createDiscount
);

/**
 * @swagger
 * /api/discount/search:
 *   get:
 *     summary: Search discount records
 *     tags: [Discount]
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
router.get("/search", searchDiscount);

/**
 * @swagger
 * /api/discount:
 *   get:
 *     summary: Get all discount records
 *     tags: [Discount]
 *     responses:
 *       200:
 *         description: Discount list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getDiscounts);

/**
 * @swagger
 * /api/discount/{id}:
 *   get:
 *     summary: Get discount by id
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Discount found
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getDiscountById);

/**
 * @swagger
 * /api/discount/{id}:
 *   put:
 *     summary: Update discount
 *     tags: [Discount]
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
 *               discount:
 *                 type: string
 *                 example: "10%"
 *               finish_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateDiscountSchema),
  updateDiscount
);

/**
 * @swagger
 * /api/discount/{id}:
 *   delete:
 *     summary: Delete discount
 *     tags: [Discount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteDiscount);

module.exports = router;
