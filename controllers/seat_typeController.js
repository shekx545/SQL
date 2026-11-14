const { Op } = require("sequelize");
const { SeatType } = require("../models");

// CREATE
const createSeatType = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await SeatType.create({ name });

    return res.status(201).json({
      success: true,
      message: "SeatType muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE SEAT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getSeatTypes = async (req, res) => {
  try {
    const items = await SeatType.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET SEAT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getSeatTypeById = async (req, res) => {
  try {
    const item = await SeatType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "SeatType topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET SEAT_TYPES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateSeatType = async (req, res) => {
  try {
    const item = await SeatType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "SeatType topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "SeatType muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE SEAT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchSeatType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await SeatType.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday seat_types topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH SEAT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteSeatType = async (req, res) => {
  try {
    const item = await SeatType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "SeatType topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "SeatType muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE SEAT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSeatType,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  searchSeatType,
  deleteSeatType,
};
