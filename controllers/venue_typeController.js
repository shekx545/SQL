const { Op } = require("sequelize");
const { VenueType, Types, Venue } = require("../models");

// CREATE
const createVenueType = async (req, res) => {
  try {
    const { venue_id, type_id } = req.body;

    const item = await VenueType.create({ venue_id, type_id });

    return res.status(201).json({
      success: true,
      message: "VenueType muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE VENUE_TYPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getVenueTypes = async (req, res) => {
  try {
    const items = await VenueType.findAll({
      include: [{ model: Venue, as: "venue" }, { model: Types, as: "type" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET VENUE_TYPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getVenueTypeById = async (req, res) => {
  try {
    const item = await VenueType.findByPk(req.params.id, {
      include: [{ model: Venue, as: "venue" }, { model: Types, as: "type" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "VenueType topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET VENUE_TYPE BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateVenueType = async (req, res) => {
  try {
    const item = await VenueType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "VenueType topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "VenueType muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE VENUE_TYPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchVenueType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    return res.status(400).json({ success: false, message: "Bu jadvalda qidirish uchun matnli maydon yoq" });
  } catch (error) {
    console.error("SEARCH VENUE_TYPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteVenueType = async (req, res) => {
  try {
    const item = await VenueType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "VenueType topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "VenueType muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE VENUE_TYPE ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVenueType,
  getVenueTypes,
  getVenueTypeById,
  updateVenueType,
  searchVenueType,
  deleteVenueType,
};