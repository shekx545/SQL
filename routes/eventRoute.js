
const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  searchEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createEventSchema,
  updateEventSchema,
} = require("../validations/eventValidation");

/**
 * @swagger
 * tags:
 *   - name: Event
 *     description: Event management endpoints
 */

/**
 * @swagger
 * /api/event:
 *   post:
 *     summary: Create event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - event_type_id
 *               - human_category_id
 *               - venue_id
 *               - lang_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Namuna nomi"
 *               photo:
 *                 type: string
 *                 example: "Namuna matn"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               start_time:
 *                 type: string
 *                 example: "Namuna matn"
 *               finish_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               finish_time:
 *                 type: string
 *                 example: "Namuna matn"
 *               info:
 *                 type: string
 *                 example: "Qoshimcha malumot"
 *               release_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               event_type_id:
 *                 type: integer
 *                 example: 1
 *               human_category_id:
 *                 type: integer
 *                 example: 1
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               lang_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  validateSchema(createEventSchema),
  createEvent
);

/**
 * @swagger
 * /api/event/search:
 *   get:
 *     summary: Search event records
 *     tags: [Event]
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
router.get("/search", searchEvent);

/**
 * @swagger
 * /api/event:
 *   get:
 *     summary: Get all event records
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Event list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getEvents);

/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     summary: Get event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/event/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Event]
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
 *               photo:
 *                 type: string
 *                 example: "Namuna matn"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               start_time:
 *                 type: string
 *                 example: "Namuna matn"
 *               finish_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               finish_time:
 *                 type: string
 *                 example: "Namuna matn"
 *               info:
 *                 type: string
 *                 example: "Qoshimcha malumot"
 *               release_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-01"
 *               event_type_id:
 *                 type: integer
 *                 example: 1
 *               human_category_id:
 *                 type: integer
 *                 example: 1
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               lang_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  validateSchema(updateEventSchema),
  updateEvent
);

/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteEvent);

module.exports = router;
