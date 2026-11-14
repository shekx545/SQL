const { Op } = require("sequelize");
const { VenuePhoto, Venue } = require("../models");

// CREATE
const createVenuePhoto = async (req, res) => {
  try {
    const { url, venue_id } = req.body;

    const item = await VenuePhoto.create({ url, venue_id });

    return res.status(201).json({
      success: true,
      message: "VenuePhoto muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE VENUE_PHOTOS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getVenuePhotos = async (req, res) => {
  try {
    const items = await VenuePhoto.findAll({
      include: [{ model: Venue, as: "venue" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET VENUE_PHOTOS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getVenuePhotoById = async (req, res) => {
  try {
    const item = await VenuePhoto.findByPk(req.params.id, {
      include: [{ model: Venue, as: "venue" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "VenuePhoto topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET VENUE_PHOTOS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateVenuePhoto = async (req, res) => {
  try {
    const item = await VenuePhoto.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "VenuePhoto topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "VenuePhoto muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE VENUE_PHOTOS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchVenuePhoto = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await VenuePhoto.findAll({
      where: { [Op.or]: [
        { url: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Venue, as: "venue" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday venue_photos topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH VENUE_PHOTOS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteVenuePhoto = async (req, res) => {
  try {
    const item = await VenuePhoto.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "VenuePhoto topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "VenuePhoto muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE VENUE_PHOTOS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVenuePhoto,
  getVenuePhotos,
  getVenuePhotoById,
  updateVenuePhoto,
  searchVenuePhoto,
  deleteVenuePhoto,
};
