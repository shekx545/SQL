const { Op } = require("sequelize");
const { Flat } = require("../models");

// CREATE
const createFlat = async (req, res) => {
  try {
    const { etaj, condition } = req.body;

    const item = await Flat.create({ etaj, condition });

    return res.status(201).json({
      success: true,
      message: "Flat muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE FLATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getFlats = async (req, res) => {
  try {
    const items = await Flat.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET FLATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getFlatById = async (req, res) => {
  try {
    const item = await Flat.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Flat topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET FLATS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateFlat = async (req, res) => {
  try {
    const item = await Flat.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Flat topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Flat muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE FLATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchFlat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Flat.findAll({
      where: { [Op.or]: [
        { condition: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday flats topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH FLATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteFlat = async (req, res) => {
  try {
    const item = await Flat.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Flat topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Flat muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE FLATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  searchFlat,
  deleteFlat,
};
