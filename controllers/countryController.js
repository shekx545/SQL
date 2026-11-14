const { Op } = require("sequelize");
const { Country } = require("../models");

// CREATE
const createCountry = async (req, res) => {
  try {
    const { country_name } = req.body;

    const item = await Country.create({ country_name });

    return res.status(201).json({
      success: true,
      message: "Country muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE COUNTRIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCountrys = async (req, res) => {
  try {
    const items = await Country.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET COUNTRIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCountryById = async (req, res) => {
  try {
    const item = await Country.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Country topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET COUNTRIES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCountry = async (req, res) => {
  try {
    const item = await Country.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Country topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Country muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE COUNTRIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCountry = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Country.findAll({
      where: { [Op.or]: [
        { country_name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday countries topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH COUNTRIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteCountry = async (req, res) => {
  try {
    const item = await Country.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Country topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Country muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE COUNTRIES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCountry,
  getCountrys,
  getCountryById,
  updateCountry,
  searchCountry,
  deleteCountry,
};
