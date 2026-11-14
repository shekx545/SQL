const { Op } = require("sequelize");
const { TicketType } = require("../models");

// CREATE
const createTicketType = async (req, res) => {
  try {
    const { ticket_type } = req.body;

    const item = await TicketType.create({ ticket_type });

    return res.status(201).json({
      success: true,
      message: "TicketType muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE TICKET_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getTicketTypes = async (req, res) => {
  try {
    const items = await TicketType.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET TICKET_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getTicketTypeById = async (req, res) => {
  try {
    const item = await TicketType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketType topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET TICKET_TYPES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateTicketType = async (req, res) => {
  try {
    const item = await TicketType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketType topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "TicketType muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE TICKET_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchTicketType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await TicketType.findAll({
      where: { [Op.or]: [
        { ticket_type: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday ticket_types topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH TICKET_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteTicketType = async (req, res) => {
  try {
    const item = await TicketType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketType topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "TicketType muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE TICKET_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTicketType,
  getTicketTypes,
  getTicketTypeById,
  updateTicketType,
  searchTicketType,
  deleteTicketType,
};
