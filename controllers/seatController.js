const { Op } = require("sequelize");
const { Seat, SeatType, Sector, Venue } = require("../models");

// CREATE
const createSeat = async (req, res) => {
  try {
    const { row_number, number, location_in_schema, sector_id, venue_id, seat_type_id } = req.body;

    const item = await Seat.create({ row_number, number, location_in_schema, sector_id, venue_id, seat_type_id });

    return res.status(201).json({
      success: true,
      message: "Seat muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE SEATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getSeats = async (req, res) => {
  try {
    const items = await Seat.findAll({
      include: [{ model: Sector, as: "sector" }, { model: Venue, as: "venue" }, { model: SeatType, as: "seat_type" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET SEATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getSeatById = async (req, res) => {
  try {
    const item = await Seat.findByPk(req.params.id, {
      include: [{ model: Sector, as: "sector" }, { model: Venue, as: "venue" }, { model: SeatType, as: "seat_type" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Seat topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET SEATS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateSeat = async (req, res) => {
  try {
    const item = await Seat.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Seat topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Seat muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE SEATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchSeat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Seat.findAll({
      where: { [Op.or]: [
        { location_in_schema: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Sector, as: "sector" }, { model: Venue, as: "venue" }, { model: SeatType, as: "seat_type" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday seats topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH SEATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteSeat = async (req, res) => {
  try {
    const item = await Seat.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Seat topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Seat muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE SEATS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSeat,
  getSeats,
  getSeatById,
  updateSeat,
  searchSeat,
  deleteSeat,
};
