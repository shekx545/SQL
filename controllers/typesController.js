const { Op } = require("sequelize");
const { Types } = require("../models");

// CREATE
const createTypes = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await Types.create({ name });

    return res.status(201).json({
      success: true,
      message: "Types muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getTypess = async (req, res) => {
  try {
    const items = await Types.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getTypesById = async (req, res) => {
  try {
    const item = await Types.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Types topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET TYPES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateTypes = async (req, res) => {
  try {
    const item = await Types.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Types topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Types muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchTypes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Types.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday types topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteTypes = async (req, res) => {
  try {
    const item = await Types.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Types topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Types muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTypes,
  getTypess,
  getTypesById,
  updateTypes,
  searchTypes,
  deleteTypes,
};
