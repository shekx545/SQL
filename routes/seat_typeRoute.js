
const express = require("express");
const router = express.Router();

const {
  createSeatType,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  searchSeatType,
  deleteSeatType,
} = require("../controllers/seat_typeController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createSeatTypeSchema,
  updateSeatTypeSchema,
} = require("../validations/seat_typeValidation");

/**
 * @swagger
 * tags:
 *   - name: Seat Type
 *     description: Seat Type management endpoints
 */

/**
 * @swagger
 * /api/seat_type:
 *   post:
 *     summary: Create seat type
 *     tags: [Seat Type]
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
 *         description: Seat Type created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createSeatTypeSchema), createSeatType);

/**
 * @swagger
 * /api/seat_type/search:
 *   get:
 *     summary: Search seat type records
 *     tags: [Seat Type]
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
router.get("/search", searchSeatType);

/**
 * @swagger
 * /api/seat_type:
 *   get:
 *     summary: Get all seat type records
 *     tags: [Seat Type]
 *     responses:
 *       200:
 *         description: Seat Type list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getSeatTypes);

/**
 * @swagger
 * /api/seat_type/{id}:
 *   get:
 *     summary: Get seat type by id
 *     tags: [Seat Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Seat Type found
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSeatTypeById);

/**
 * @swagger
 * /api/seat_type/{id}:
 *   put:
 *     summary: Update seat type
 *     tags: [Seat Type]
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
 *         description: Seat Type updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateSeatTypeSchema), updateSeatType);

/**
 * @swagger
 * /api/seat_type/{id}:
 *   delete:
 *     summary: Delete seat type
 *     tags: [Seat Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Seat Type deleted successfully
 *       404:
 *         description: Seat Type not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSeatType);

module.exports = router;
