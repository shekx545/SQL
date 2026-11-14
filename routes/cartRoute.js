
const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCartSchema,
  updateCartSchema,
} = require("../validations/cartValidation");

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart management endpoints
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - status_id
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createCartSchema),
  cartController.createCart
);

/**
 * @swagger
 * /api/cart/search:
 *   get:
 *     summary: Search cart records
 *     tags: [Cart]
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
router.get("/search", cartController.searchCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart records
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", cartController.getCarts);

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart by id
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cart found
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get("/:id", cartController.getCartById);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update cart
 *     tags: [Cart]
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
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCartSchema),
  cartController.updateCart
);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", cartController.deleteCart);

module.exports = router;
