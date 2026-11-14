const { Op } = require("sequelize");
const { Region } = require("../models");

// CREATE
const createRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await Region.create({ name });

    return res.status(201).json({
      success: true,
      message: "Region muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE REGIONS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getRegions = async (req, res) => {
  try {
    const items = await Region.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET REGIONS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getRegionById = async (req, res) => {
  try {
    const item = await Region.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Region topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET REGIONS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateRegion = async (req, res) => {
  try {
    const item = await Region.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Region topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Region muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE REGIONS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchRegion = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Region.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday regions topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH REGIONS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteRegion = async (req, res) => {
  try {
    const item = await Region.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Region topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Region muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE REGIONS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRegion,
  getRegions,
  getRegionById,
  updateRegion,
  searchRegion,
  deleteRegion,
};
