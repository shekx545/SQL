const { Op } = require("sequelize");
const { Ticket, Event, Seat, TicketStatus, TicketType } = require("../models");

// CREATE
const createTicket = async (req, res) => {
  try {
    const { price, service_fee, event_id, seat_id, status_id, ticket_type_id } = req.body;

    const item = await Ticket.create({ price, service_fee, event_id, seat_id, status_id, ticket_type_id });

    return res.status(201).json({
      success: true,
      message: "Ticket muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE TICKETS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getTickets = async (req, res) => {
  try {
    const items = await Ticket.findAll({
      include: [{ model: Event, as: "event" }, { model: Seat, as: "seat" }, { model: TicketStatus, as: "status" }, { model: TicketType, as: "ticket_type" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET TICKETS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getTicketById = async (req, res) => {
  try {
    const item = await Ticket.findByPk(req.params.id, {
      include: [{ model: Event, as: "event" }, { model: Seat, as: "seat" }, { model: TicketStatus, as: "status" }, { model: TicketType, as: "ticket_type" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Ticket topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET TICKETS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateTicket = async (req, res) => {
  try {
    const item = await Ticket.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Ticket topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Ticket muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE TICKETS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchTicket = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    return res.status(400).json({ success: false, message: "Bu jadvalda qidirish uchun matnli maydon yoq" });
  } catch (error) {
    console.error("SEARCH TICKETS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteTicket = async (req, res) => {
  try {
    const item = await Ticket.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Ticket topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Ticket muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE TICKETS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  searchTicket,
  deleteTicket,
};
