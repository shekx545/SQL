
const express = require("express");
const router = express.Router();

const {
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  searchEventType,
  deleteEventType,
} = require("../controllers/event_typeController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createEventTypeSchema,
  updateEventTypeSchema,
} = require("../validations/event_typeValidation");

/**
 * @swagger
 * tags:
 *   - name: Event Type
 *     description: Event Type management endpoints
 */

/**
 * @swagger
 * /api/event_type:
 *   post:
 *     summary: Create event type
 *     tags: [Event Type]
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
 *               parent_event_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event Type created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createEventTypeSchema),
  createEventType
);

/**
 * @swagger
 * /api/event_type/search:
 *   get:
 *     summary: Search event type records
 *     tags: [Event Type]
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
router.get("/search", searchEventType);

/**
 * @swagger
 * /api/event_type:
 *   get:
 *     summary: Get all event type records
 *     tags: [Event Type]
 *     responses:
 *       200:
 *         description: Event Type list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getEventTypes);

/**
 * @swagger
 * /api/event_type/{id}:
 *   get:
 *     summary: Get event type by id
 *     tags: [Event Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event Type found
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getEventTypeById);

/**
 * @swagger
 * /api/event_type/{id}:
 *   put:
 *     summary: Update event type
 *     tags: [Event Type]
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
 *               parent_event_type_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Event Type updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateEventTypeSchema),
  updateEventType
);

/**
 * @swagger
 * /api/event_type/{id}:
 *   delete:
 *     summary: Delete event type
 *     tags: [Event Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event Type deleted successfully
 *       404:
 *         description: Event Type not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteEventType);

module.exports = router;
