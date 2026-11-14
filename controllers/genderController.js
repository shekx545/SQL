const { Op } = require("sequelize");
const { Gender } = require("../models");

// CREATE
const createGender = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await Gender.create({ name });

    return res.status(201).json({
      success: true,
      message: "Gender muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE GENDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getGenders = async (req, res) => {
  try {
    const items = await Gender.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET GENDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getGenderById = async (req, res) => {
  try {
    const item = await Gender.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Gender topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET GENDERS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateGender = async (req, res) => {
  try {
    const item = await Gender.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Gender topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Gender muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE GENDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchGender = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Gender.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday genders topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH GENDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteGender = async (req, res) => {
  try {
    const item = await Gender.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Gender topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Gender muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE GENDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createGender,
  getGenders,
  getGenderById,
  updateGender,
  searchGender,
  deleteGender,
};
