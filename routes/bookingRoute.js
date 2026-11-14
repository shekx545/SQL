
const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
    createBookingSchema,
    updateBookingSchema
} = require("../validations/bookingValidation");

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management
 */

/**
 * @swagger
 * /api/booking:
 *   post:
 *     tags: [Booking]
 *     summary: Create booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - payment_method_id
 *               - delivery_method_id
 *               - status_id
 *             properties:
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *               payment_method_id:
 *                 type: integer
 *                 example: 1
 *               delivery_method_id:
 *                 type: integer
 *                 example: 1
 *               discount_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createBookingSchema), bookingController.createBooking);

/**
 * @swagger
 * /api/booking/search:
 *   get:
 *     tags: [Booking]
 *     summary: Search bookings
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
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/search", bookingController.searchBooking);

/**
 * @swagger
 * /api/booking:
 *   get:
 *     tags: [Booking]
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: Booking list
 *       500:
 *         description: Server error
 */
router.get("/", bookingController.getBookings);

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     tags: [Booking]
 *     summary: Get booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.get("/:id", bookingController.getBookingById);

/**
 * @swagger
 * /api/booking/{id}:
 *   put:
 *     tags: [Booking]
 *     summary: Update booking by ID
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
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *               payment_method_id:
 *                 type: integer
 *                 example: 1
 *               delivery_method_id:
 *                 type: integer
 *                 example: 1
 *               discount_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateBookingSchema), bookingController.updateBooking);

/**
 * @swagger
 * /api/booking/{id}:
 *   delete:
 *     tags: [Booking]
 *     summary: Delete booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
