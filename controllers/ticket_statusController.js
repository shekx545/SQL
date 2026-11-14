const { Op } = require("sequelize");
const { TicketStatus } = require("../models");

// CREATE
const createTicketStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await TicketStatus.create({ name });

    return res.status(201).json({
      success: true,
      message: "TicketStatus muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE TICKET_STATUSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getTicketStatuss = async (req, res) => {
  try {
    const items = await TicketStatus.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET TICKET_STATUSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getTicketStatusById = async (req, res) => {
  try {
    const item = await TicketStatus.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketStatus topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET TICKET_STATUSES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateTicketStatus = async (req, res) => {
  try {
    const item = await TicketStatus.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketStatus topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "TicketStatus muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE TICKET_STATUSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchTicketStatus = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await TicketStatus.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday ticket_statuses topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH TICKET_STATUSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteTicketStatus = async (req, res) => {
  try {
    const item = await TicketStatus.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "TicketStatus topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "TicketStatus muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE TICKET_STATUSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTicketStatus,
  getTicketStatuss,
  getTicketStatusById,
  updateTicketStatus,
  searchTicketStatus,
  deleteTicketStatus,
};
