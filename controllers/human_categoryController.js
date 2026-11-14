const { Op } = require("sequelize");
const { HumanCategory, Gender } = require("../models");

// CREATE
const createHumanCategory = async (req, res) => {
  try {
    const { name, start_age, finish_age, gender_id } = req.body;

    const item = await HumanCategory.create({ name, start_age, finish_age, gender_id });

    return res.status(201).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE HUMAN_CATEGORIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getHumanCategorys = async (req, res) => {
  try {
    const items = await HumanCategory.findAll({
      include: [{ model: Gender, as: "gender" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET HUMAN_CATEGORIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getHumanCategoryById = async (req, res) => {
  try {
    const item = await HumanCategory.findByPk(req.params.id, {
      include: [{ model: Gender, as: "gender" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "HumanCategory topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET HUMAN_CATEGORIES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateHumanCategory = async (req, res) => {
  try {
    const item = await HumanCategory.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "HumanCategory topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE HUMAN_CATEGORIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchHumanCategory = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await HumanCategory.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Gender, as: "gender" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday human_categories topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH HUMAN_CATEGORIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteHumanCategory = async (req, res) => {
  try {
    const item = await HumanCategory.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "HumanCategory topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "HumanCategory muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE HUMAN_CATEGORIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createHumanCategory,
  getHumanCategorys,
  getHumanCategoryById,
  updateHumanCategory,
  searchHumanCategory,
  deleteHumanCategory,
};
