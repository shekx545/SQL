
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createAdminSchema,
  updateAdminSchema,
} = require("../validations/adminValidation");

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin management
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     tags: [Admin]
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - login
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               login:
 *                 type: string
 *                 example: "bossadmin"
 *               password:
 *                 type: string
 *                 example: "SuperParol123"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               is_creator:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Admin created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/register", validateSchema(createAdminSchema), adminController.registerAdmin);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Login admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 example: "bossadmin"
 *               password:
 *                 type: string
 *                 example: "SuperParol123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", adminController.loginAdmin);

/**
 * @swagger
 * /api/admin/search:
 *   get:
 *     tags: [Admin]
 *     summary: Search admins
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/search", adminController.searchAdmin);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     tags: [Admin]
 *     summary: Get all admins
 *     responses:
 *       200:
 *         description: Admin list
 *       500:
 *         description: Server error
 */
router.get("/", adminController.getAdmins);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin found
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.get("/:id", adminController.getAdminById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: Update admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Admin updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateAdminSchema), adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin deleted
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
