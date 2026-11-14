
const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../validations/customerValidation");

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Customer management endpoints
 */

/**
 * @swagger
 * /api/customer/register:
 *   post:
 *     summary: Register new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - phone
 *               - hashed_password
 *               - email
 *               - gender_id
 *               - lang_id
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Namuna matn"
 *               last_name:
 *                 type: string
 *                 example: "Namuna matn"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               hashed_password:
 *                 type: string
 *                 example: "SuperParol123"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               hashed_refresh_token:
 *                 type: string
 *                 example: "Namuna matn"
 *               gender_id:
 *                 type: integer
 *                 example: 1
 *               lang_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/register",
  validateSchema(createCustomerSchema),
  customerController.registerCustomer
);

/**
 * @swagger
 * /api/customer/login:
 *   post:
 *     summary: Login customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "+998901112233"
 *               password:
 *                 type: string
 *                 example: "SuperParol123"
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", customerController.loginCustomer);

/**
 * @swagger
 * /api/customer/search:
 *   get:
 *     summary: Search customer records
 *     tags: [Customer]
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
router.get("/search", customerController.searchCustomer);

/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary: Get all customer records
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: Customer list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", customerController.getCustomers);

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     summary: Get customer by id
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get("/:id", customerController.getCustomerById);

/**
 * @swagger
 * /api/customer/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customer]
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
 *               first_name:
 *                 type: string
 *                 example: "Namuna matn"
 *               last_name:
 *                 type: string
 *                 example: "Namuna matn"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               hashed_password:
 *                 type: string
 *                 example: "SuperParol123"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               hashed_refresh_token:
 *                 type: string
 *                 example: "Namuna matn"
 *               gender_id:
 *                 type: integer
 *                 example: 1
 *               lang_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateCustomerSchema),
  customerController.updateCustomer
);

/**
 * @swagger
 * /api/customer/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
