
const express = require("express");
const router = express.Router();

const {
  createVenuePhoto,
  getVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  searchVenuePhoto,
  deleteVenuePhoto,
} = require("../controllers/venue_photoController");

const { validateSchema } = require("../middlewares/ValidateSchema");
const {
  createVenuePhotoSchema,
  updateVenuePhotoSchema,
} = require("../validations/venue_photoValidation");

/**
 * @swagger
 * tags:
 *   - name: Venue Photo
 *     description: Venue Photo management endpoints
 */

/**
 * @swagger
 * /api/venue_photo:
 *   post:
 *     summary: Create venue photo
 *     tags: [Venue Photo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - venue_id
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Venue Photo created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validateSchema(createVenuePhotoSchema), createVenuePhoto);

/**
 * @swagger
 * /api/venue_photo/search:
 *   get:
 *     summary: Search venue photo records
 *     tags: [Venue Photo]
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
router.get("/search", searchVenuePhoto);

/**
 * @swagger
 * /api/venue_photo:
 *   get:
 *     summary: Get all venue photo records
 *     tags: [Venue Photo]
 *     responses:
 *       200:
 *         description: Venue Photo list retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getVenuePhotos);

/**
 * @swagger
 * /api/venue_photo/{id}:
 *   get:
 *     summary: Get venue photo by id
 *     tags: [Venue Photo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue Photo found
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getVenuePhotoById);

/**
 * @swagger
 * /api/venue_photo/{id}:
 *   put:
 *     summary: Update venue photo
 *     tags: [Venue Photo]
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
 *               url:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Venue Photo updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.put("/:id", validateSchema(updateVenuePhotoSchema), updateVenuePhoto);

/**
 * @swagger
 * /api/venue_photo/{id}:
 *   delete:
 *     summary: Delete venue photo
 *     tags: [Venue Photo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venue Photo deleted successfully
 *       404:
 *         description: Venue Photo not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteVenuePhoto);

module.exports = router;
