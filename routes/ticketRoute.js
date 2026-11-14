
const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  searchTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createTicketSchema,
  updateTicketSchema,
} = require("../validations/ticketValidation");

/**
 * @swagger
 * tags:
 *   - name: Ticket
 *     description: Ticket management endpoints
 */

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Create ticket
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *               - event_id
 *               - seat_id
 *               - status_id
 *               - ticket_type_id
 *             properties:
 *               price:
 *                 type: number
 *                 example: 150000
 *               service_fee:
 *                 type: number
 *                 example: 5000
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               seat_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *               ticket_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createTicketSchema), createTicket);

/**
 * @swagger
 * /api/ticket/search:
 *   get:
 *     summary: Search ticket records
 *     tags: [Ticket]
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
router.get("/search", searchTicket);

/**
 * @swagger
 * /api/ticket:
 *   get:
 *     summary: Get all ticket records
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: Ticket list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getTickets);

/**
 * @swagger
 * /api/ticket/{id}:
 *   get:
 *     summary: Get ticket by id
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTicketById);

/**
 * @swagger
 * /api/ticket/{id}:
 *   put:
 *     summary: Update ticket
 *     tags: [Ticket]
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
 *               price:
 *                 type: number
 *                 example: 150000
 *               service_fee:
 *                 type: number
 *                 example: 5000
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               seat_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 1
 *               ticket_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateTicketSchema), updateTicket);

/**
 * @swagger
 * /api/ticket/{id}:
 *   delete:
 *     summary: Delete ticket
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteTicket);

module.exports = router;
