
const express = require("express");
const router = express.Router();

const {
  createSeat,
  getSeats,
  getSeatById,
  updateSeat,
  searchSeat,
  deleteSeat,
} = require("../controllers/seatController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createSeatSchema,
  updateSeatSchema,
} = require("../validations/seatValidation");

/**
 * @swagger
 * tags:
 *   - name: Seat
 *     description: Seat management endpoints
 */

/**
 * @swagger
 * /api/seat:
 *   post:
 *     summary: Create seat
 *     tags: [Seat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - row_number
 *               - number
 *               - sector_id
 *               - venue_id
 *               - seat_type_id
 *             properties:
 *               row_number:
 *                 type: integer
 *                 example: 5
 *               number:
 *                 type: integer
 *                 example: 12
 *               location_in_schema:
 *                 type: string
 *                 example: "Toshkent"
 *               sector_id:
 *                 type: integer
 *                 example: 1
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               seat_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Seat created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createSeatSchema), createSeat);

/**
 * @swagger
 * /api/seat/search:
 *   get:
 *     summary: Search seat records
 *     tags: [Seat]
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
router.get("/search", searchSeat);

/**
 * @swagger
 * /api/seat:
 *   get:
 *     summary: Get all seat records
 *     tags: [Seat]
 *     responses:
 *       200:
 *         description: Seat list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getSeats);

/**
 * @swagger
 * /api/seat/{id}:
 *   get:
 *     summary: Get seat by id
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Seat found
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getSeatById);

/**
 * @swagger
 * /api/seat/{id}:
 *   put:
 *     summary: Update seat
 *     tags: [Seat]
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
 *               row_number:
 *                 type: integer
 *                 example: 5
 *               number:
 *                 type: integer
 *                 example: 12
 *               location_in_schema:
 *                 type: string
 *                 example: "Toshkent"
 *               sector_id:
 *                 type: integer
 *                 example: 1
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               seat_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateSeatSchema), updateSeat);

/**
 * @swagger
 * /api/seat/{id}:
 *   delete:
 *     summary: Delete seat
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSeat);

module.exports = router;
