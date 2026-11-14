const { Op } = require("sequelize");
const { Sector } = require("../models");

// CREATE
const createSector = async (req, res) => {
  try {
    const { sector_name } = req.body;

    const item = await Sector.create({ sector_name });

    return res.status(201).json({
      success: true,
      message: "Sector muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE SECTORS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getSectors = async (req, res) => {
  try {
    const items = await Sector.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET SECTORS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getSectorById = async (req, res) => {
  try {
    const item = await Sector.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Sector topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET SECTORS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateSector = async (req, res) => {
  try {
    const item = await Sector.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Sector topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Sector muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE SECTORS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchSector = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Sector.findAll({
      where: { [Op.or]: [
        { sector_name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday sectors topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH SECTORS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteSector = async (req, res) => {
  try {
    const item = await Sector.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Sector topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Sector muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE SECTORS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSector,
  getSectors,
  getSectorById,
  updateSector,
  searchSector,
  deleteSector,
};
