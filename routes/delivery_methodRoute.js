
const express = require("express");
const router = express.Router();

const {
  createDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  searchDeliveryMethod,
  deleteDeliveryMethod,
} = require("../controllers/delivery_methodController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createDeliveryMethodSchema,
  updateDeliveryMethodSchema,
} = require("../validations/delivery_methodValidation");

/**
 * @swagger
 * tags:
 *   - name: Delivery Method
 *     description: Delivery Method management endpoints
 */

/**
 * @swagger
 * /api/delivery_method:
 *   post:
 *     summary: Create delivery method
 *     tags: [Delivery Method]
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
 *         description: Delivery Method created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createDeliveryMethodSchema),
  createDeliveryMethod
);

/**
 * @swagger
 * /api/delivery_method/search:
 *   get:
 *     summary: Search delivery method records
 *     tags: [Delivery Method]
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
router.get("/search", searchDeliveryMethod);

/**
 * @swagger
 * /api/delivery_method:
 *   get:
 *     summary: Get all delivery method records
 *     tags: [Delivery Method]
 *     responses:
 *       200:
 *         description: Delivery Method list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getDeliveryMethods);

/**
 * @swagger
 * /api/delivery_method/{id}:
 *   get:
 *     summary: Get delivery method by id
 *     tags: [Delivery Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Delivery Method found
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery_method/{id}:
 *   put:
 *     summary: Update delivery method
 *     tags: [Delivery Method]
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
 *         description: Delivery Method updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateDeliveryMethodSchema),
  updateDeliveryMethod
);

/**
 * @swagger
 * /api/delivery_method/{id}:
 *   delete:
 *     summary: Delete delivery method
 *     tags: [Delivery Method]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Delivery Method deleted successfully
 *       404:
 *         description: Delivery Method not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteDeliveryMethod);

module.exports = router;
