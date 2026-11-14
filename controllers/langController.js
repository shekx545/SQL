const { Op } = require("sequelize");
const { Lang } = require("../models");

// CREATE
const createLang = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await Lang.create({ name });

    return res.status(201).json({
      success: true,
      message: "Lang muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE LANGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getLangs = async (req, res) => {
  try {
    const items = await Lang.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET LANGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getLangById = async (req, res) => {
  try {
    const item = await Lang.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lang topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET LANGS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateLang = async (req, res) => {
  try {
    const item = await Lang.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lang topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Lang muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE LANGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchLang = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Lang.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday langs topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH LANGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteLang = async (req, res) => {
  try {
    const item = await Lang.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Lang topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Lang muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE LANGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLang,
  getLangs,
  getLangById,
  updateLang,
  searchLang,
  deleteLang,
};
