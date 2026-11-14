
const express = require("express");
const router = express.Router();

const customerAddressController = require("../controllers/customer_addressController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCustomerAddressSchema,
  updateCustomerAddressSchema,
} = require("../validations/customer_addressValidation");

/**
 * @swagger
 * tags:
 *   - name: Customer Address
 *     description: Customer Address management endpoints
 */

/**
 * @swagger
 * /api/customer_address:
 *   post:
 *     summary: Create customer address
 *     tags: [Customer Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - region_id
 *               - district_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               street:
 *                 type: string
 *                 example: "Bunyodkor"
 *               house:
 *                 type: string
 *                 example: "12"
 *               location:
 *                 type: string
 *                 example: "Toshkent"
 *               post_index:
 *                 type: string
 *                 example: "100000"
 *               info:
 *                 type: string
 *                 example: "Qoshimcha malumot"
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               region_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               flat_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Customer Address created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createCustomerAddressSchema),
  customerAddressController.createCustomerAddress
);

/**
 * @swagger
 * /api/customer_address/search:
 *   get:
 *     summary: Search customer address records
 *     tags: [Customer Address]
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
router.get("/search", customerAddressController.searchCustomerAddress);

/**
 * @swagger
 * /api/customer_address:
 *   get:
 *     summary: Get all customer address records
 *     tags: [Customer Address]
 *     responses:
 *       200:
 *         description: Customer Address list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", customerAddressController.getCustomerAddresss);

/**
 * @swagger
 * /api/customer_address/{id}:
 *   get:
 *     summary: Get customer address by id
 *     tags: [Customer Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer Address found
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.get("/:id", customerAddressController.getCustomerAddressById);

/**
 * @swagger
 * /api/customer_address/{id}:
 *   put:
 *     summary: Update customer address
 *     tags: [Customer Address]
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
 *               street:
 *                 type: string
 *                 example: "Bunyodkor"
 *               house:
 *                 type: string
 *                 example: "12"
 *               location:
 *                 type: string
 *                 example: "Toshkent"
 *               post_index:
 *                 type: string
 *                 example: "100000"
 *               info:
 *                 type: string
 *                 example: "Qoshimcha malumot"
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               region_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               flat_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Customer Address updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCustomerAddressSchema),
  customerAddressController.updateCustomerAddress
);

/**
 * @swagger
 * /api/customer_address/{id}:
 *   delete:
 *     summary: Delete customer address
 *     tags: [Customer Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer Address deleted successfully
 *       404:
 *         description: Customer Address not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", customerAddressController.deleteCustomerAddress);

module.exports = router;
