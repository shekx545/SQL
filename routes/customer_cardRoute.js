
const express = require("express");
const router = express.Router();

const customerCardController = require("../controllers/customer_cardController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCustomerCardSchema,
  updateCustomerCardSchema,
} = require("../validations/customer_cardValidation");

/**
 * @swagger
 * tags:
 *   - name: Customer Card
 *     description: Customer Card management endpoints
 */

/**
 * @swagger
 * /api/customer_card:
 *   post:
 *     summary: Create customer card
 *     tags: [Customer Card]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - customer_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               number:
 *                 type: string
 *                 example: "8600123456781234"
 *               year:
 *                 type: string
 *                 example: "27"
 *               month:
 *                 type: string
 *                 example: "05"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               is_main:
 *                 type: boolean
 *                 example: true
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Customer Card created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createCustomerCardSchema),
  customerCardController.createCustomerCard
);

/**
 * @swagger
 * /api/customer_card/search:
 *   get:
 *     summary: Search customer card records
 *     tags: [Customer Card]
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
router.get("/search", customerCardController.searchCustomerCard);

/**
 * @swagger
 * /api/customer_card:
 *   get:
 *     summary: Get all customer card records
 *     tags: [Customer Card]
 *     responses:
 *       200:
 *         description: Customer Card list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", customerCardController.getCustomerCards);

/**
 * @swagger
 * /api/customer_card/{id}:
 *   get:
 *     summary: Get customer card by id
 *     tags: [Customer Card]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer Card found
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.get("/:id", customerCardController.getCustomerCardById);

/**
 * @swagger
 * /api/customer_card/{id}:
 *   put:
 *     summary: Update customer card
 *     tags: [Customer Card]
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
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               number:
 *                 type: string
 *                 example: "8600123456781234"
 *               year:
 *                 type: string
 *                 example: "27"
 *               month:
 *                 type: string
 *                 example: "05"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               is_main:
 *                 type: boolean
 *                 example: true
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Customer Card updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCustomerCardSchema),
  customerCardController.updateCustomerCard
);

/**
 * @swagger
 * /api/customer_card/{id}:
 *   delete:
 *     summary: Delete customer card
 *     tags: [Customer Card]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer Card deleted successfully
 *       404:
 *         description: Customer Card not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", customerCardController.deleteCustomerCard);

module.exports = router;
