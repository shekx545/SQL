const { Op } = require("sequelize");
const { Event, EventType, HumanCategory, Lang, Venue } = require("../models");

// CREATE
const createEvent = async (req, res) => {
  try {
    const { name, photo, start_date, start_time, finish_date, finish_time, info, release_date, event_type_id, human_category_id, venue_id, lang_id } = req.body;

    const item = await Event.create({ name, photo, start_date, start_time, finish_date, finish_time, info, release_date, event_type_id, human_category_id, venue_id, lang_id });

    return res.status(201).json({
      success: true,
      message: "Event muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE EVENTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getEvents = async (req, res) => {
  try {
    const items = await Event.findAll({
      include: [{ model: EventType, as: "event_type" }, { model: HumanCategory, as: "human_category" }, { model: Venue, as: "venue" }, { model: Lang, as: "lang" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getEventById = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id, {
      include: [{ model: EventType, as: "event_type" }, { model: HumanCategory, as: "human_category" }, { model: Venue, as: "venue" }, { model: Lang, as: "lang" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Event topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET EVENTS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Event topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Event muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE EVENTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchEvent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Event.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { photo: { [Op.iLike]: `%${query}%` } },
        { start_time: { [Op.iLike]: `%${query}%` } },
        { finish_time: { [Op.iLike]: `%${query}%` } },
        { info: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: EventType, as: "event_type" }, { model: HumanCategory, as: "human_category" }, { model: Venue, as: "venue" }, { model: Lang, as: "lang" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday events topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH EVENTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteEvent = async (req, res) => {
  try {
    const item = await Event.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Event topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Event muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE EVENTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  searchEvent,
  deleteEvent,
};
