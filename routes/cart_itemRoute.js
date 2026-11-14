
const express = require("express");
const router = express.Router();

const cartItemController = require("../controllers/cart_itemController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCartItemSchema,
  updateCartItemSchema,
} = require("../validations/cart_itemValidation");

/**
 * @swagger
 * tags:
 *   - name: Cart Item
 *     description: Cart Item management endpoints
 */

/**
 * @swagger
 * /api/cart_item:
 *   post:
 *     summary: Create cart item
 *     tags: [Cart Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_id
 *               - cart_id
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 example: 1
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Cart Item created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createCartItemSchema),
  cartItemController.createCartItem
);

/**
 * @swagger
 * /api/cart_item/search:
 *   get:
 *     summary: Search cart item records
 *     tags: [Cart Item]
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
router.get("/search", cartItemController.searchCartItem);

/**
 * @swagger
 * /api/cart_item:
 *   get:
 *     summary: Get all cart item records
 *     tags: [Cart Item]
 *     responses:
 *       200:
 *         description: Cart Item list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", cartItemController.getCartItems);

/**
 * @swagger
 * /api/cart_item/{id}:
 *   get:
 *     summary: Get cart item by id
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cart Item found
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.get("/:id", cartItemController.getCartItemById);

/**
 * @swagger
 * /api/cart_item/{id}:
 *   put:
 *     summary: Update cart item
 *     tags: [Cart Item]
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
 *               ticket_id:
 *                 type: integer
 *                 example: 1
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cart Item updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCartItemSchema),
  cartItemController.updateCartItem
);

/**
 * @swagger
 * /api/cart_item/{id}:
 *   delete:
 *     summary: Delete cart item
 *     tags: [Cart Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cart Item deleted successfully
 *       404:
 *         description: Cart Item not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", cartItemController.deleteCartItem);

module.exports = router;
