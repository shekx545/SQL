
const express = require("express");
const router = express.Router();

const {
  createTicketStatus,
  getTicketStatuss,
  getTicketStatusById,
  updateTicketStatus,
  searchTicketStatus,
  deleteTicketStatus,
} = require("../controllers/ticket_statusController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createTicketStatusSchema,
  updateTicketStatusSchema,
} = require("../validations/ticket_statusValidation");

/**
 * @swagger
 * tags:
 *   - name: Ticket Status
 *     description: Ticket Status management endpoints
 */

/**
 * @swagger
 * /api/ticket_status:
 *   post:
 *     summary: Create ticket status
 *     tags: [Ticket Status]
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
 *         description: Ticket Status created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createTicketStatusSchema), createTicketStatus);

/**
 * @swagger
 * /api/ticket_status/search:
 *   get:
 *     summary: Search ticket status records
 *     tags: [Ticket Status]
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
router.get("/search", searchTicketStatus);

/**
 * @swagger
 * /api/ticket_status:
 *   get:
 *     summary: Get all ticket status records
 *     tags: [Ticket Status]
 *     responses:
 *       200:
 *         description: Ticket Status list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getTicketStatuss);

/**
 * @swagger
 * /api/ticket_status/{id}:
 *   get:
 *     summary: Get ticket status by id
 *     tags: [Ticket Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket Status found
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTicketStatusById);

/**
 * @swagger
 * /api/ticket_status/{id}:
 *   put:
 *     summary: Update ticket status
 *     tags: [Ticket Status]
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
 *         description: Ticket Status updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateTicketStatusSchema), updateTicketStatus);

/**
 * @swagger
 * /api/ticket_status/{id}:
 *   delete:
 *     summary: Delete ticket status
 *     tags: [Ticket Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ticket Status deleted successfully
 *       404:
 *         description: Ticket Status not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteTicketStatus);

module.exports = router;
