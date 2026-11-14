const { Op } = require("sequelize");
const { EventType } = require("../models");

// CREATE
const createEventType = async (req, res) => {
  try {
    const { name, parent_event_type_id } = req.body;

    const item = await EventType.create({ name, parent_event_type_id });

    return res.status(201).json({
      success: true,
      message: "EventType muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE EVENT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getEventTypes = async (req, res) => {
  try {
    const items = await EventType.findAll({
      include: [{ model: EventType, as: "event_type" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET EVENT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getEventTypeById = async (req, res) => {
  try {
    const item = await EventType.findByPk(req.params.id, {
      include: [{ model: EventType, as: "event_type" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "EventType topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET EVENT_TYPES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateEventType = async (req, res) => {
  try {
    const item = await EventType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "EventType topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "EventType muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE EVENT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchEventType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await EventType.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: EventType, as: "event_type" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday event_types topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH EVENT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteEventType = async (req, res) => {
  try {
    const item = await EventType.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "EventType topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "EventType muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE EVENT_TYPES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEventType,
  getEventTypes,
  getEventTypeById,
  updateEventType,
  searchEventType,
  deleteEventType,
};
