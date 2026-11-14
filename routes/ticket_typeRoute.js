
const express = require("express");
const router = express.Router();

const {
  createTicketType,
  getTicketTypes,
  getTicketTypeById,
  updateTicketType,
  searchTicketType,
  deleteTicketType,
} = require("../controllers/ticket_typeController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createTicketTypeSchema,
  updateTicketTypeSchema,
} = require("../validations/ticket_typeValidation");

/**
 * @swagger
 * tags:
 *   - name: Ticket Type
 *     description: Ticket Type management endpoints
 */

/**
 * @swagger
 * /api/ticket_type:
 *   post:
 *     summary: Create ticket type
 *     tags: [Ticket Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_type
 *             properties:
 *               ticket_type:
 *                 type: string
 *                 example: "VIP"
 *     responses:
 *       201:
 *         description: Ticket Type created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createTicketTypeSchema), createTicketType);

/**
 * @swagger
 * /api/ticket_type/search:
 *   get:
 *     summary: Search ticket type records
 *     tags: [Ticket Type]
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
router.get("/search", searchTicketType);

/**
 * @swagger
 * /api/ticket_type:
 *   get:
 *     summary: Get all ticket type records
 *     tags: [Ticket Type]
 *     responses:
 *       200:
 *         description: Ticket Type list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getTicketTypes);

/**
 * @swagger
 * /api/ticket_type/{id}:
 *   get:
 *     summary: Get ticket type by id
 *     tags: [Ticket Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket Type found
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTicketTypeById);

/**
 * @swagger
 * /api/ticket_type/{id}:
 *   put:
 *     summary: Update ticket type
 *     tags: [Ticket Type]
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
 *               ticket_type:
 *                 type: string
 *                 example: "VIP"
 *     responses:
 *       200:
 *         description: Ticket Type updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateTicketTypeSchema), updateTicketType);

/**
 * @swagger
 * /api/ticket_type/{id}:
 *   delete:
 *     summary: Delete ticket type
 *     tags: [Ticket Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket Type deleted successfully
 *       404:
 *         description: Ticket Type not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteTicketType);

module.exports = router;
