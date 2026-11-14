const { Op } = require("sequelize");
const { District, Region } = require("../models");

// CREATE
const createDistrict = async (req, res) => {
  try {
    const { name, region_id } = req.body;

    const item = await District.create({ name, region_id });

    return res.status(201).json({
      success: true,
      message: "District muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE DISTRICTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getDistricts = async (req, res) => {
  try {
    const items = await District.findAll({
      include: [{ model: Region, as: "region" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET DISTRICTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getDistrictById = async (req, res) => {
  try {
    const item = await District.findByPk(req.params.id, {
      include: [{ model: Region, as: "region" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "District topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET DISTRICTS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateDistrict = async (req, res) => {
  try {
    const item = await District.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "District topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "District muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE DISTRICTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchDistrict = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await District.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Region, as: "region" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday districts topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH DISTRICTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteDistrict = async (req, res) => {
  try {
    const item = await District.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "District topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "District muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE DISTRICTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  searchDistrict,
  deleteDistrict,
};
