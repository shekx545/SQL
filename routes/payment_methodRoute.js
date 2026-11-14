
const express = require("express");
const router = express.Router();

const {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  searchPaymentMethod,
  deletePaymentMethod,
} = require("../controllers/payment_methodController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createPaymentMethodSchema,
  updatePaymentMethodSchema,
} = require("../validations/payment_methodValidation");

/**
 * @swagger
 * tags:
 *   - name: Payment Method
 *     description: Payment Method management endpoints
 */

/**
 * @swagger
 * /api/payment_method:
 *   post:
 *     summary: Create payment method
 *     tags: [Payment Method]
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
 *         description: Payment Method created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createPaymentMethodSchema),
  createPaymentMethod
);

/**
 * @swagger
 * /api/payment_method/search:
 *   get:
 *     summary: Search payment method records
 *     tags: [Payment Method]
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
router.get("/search", searchPaymentMethod);

/**
 * @swagger
 * /api/payment_method:
 *   get:
 *     summary: Get all payment method records
 *     tags: [Payment Method]
 *     responses:
 *       200:
 *         description: Payment Method list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getPaymentMethods);

/**
 * @swagger
 * /api/payment_method/{id}:
 *   get:
 *     summary: Get payment method by id
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Payment Method found
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getPaymentMethodById);

/**
 * @swagger
 * /api/payment_method/{id}:
 *   put:
 *     summary: Update payment method
 *     tags: [Payment Method]
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
 *         description: Payment Method updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updatePaymentMethodSchema),
  updatePaymentMethod
);

/**
 * @swagger
 * /api/payment_method/{id}:
 *   delete:
 *     summary: Delete payment method
 *     tags: [Payment Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Payment Method deleted successfully
 *       404:
 *         description: Payment Method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deletePaymentMethod);

module.exports = router;
