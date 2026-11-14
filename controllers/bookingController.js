const { Op } = require("sequelize");
const { Booking, Cart, DeliveryMethod, Discount, PaymentMethod, TicketStatus } = require("../models");

const createBooking = async (req, res) => {
  try {
    const { cart_id, payment_method_id, delivery_method_id, discount_id, status_id } = req.body;

    const item = await Booking.create({ cart_id, payment_method_id, delivery_method_id, discount_id, status_id });

    return res.status(201).json({
      success: true,
      message: "Booking muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE BOOKINGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const items = await Booking.findAll({
      include: [{ model: Cart, as: "cart" }, { model: PaymentMethod, as: "payment_method" }, { model: DeliveryMethod, as: "delivery_method" }, { model: Discount, as: "discount" }, { model: TicketStatus, as: "status" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getBookingById = async (req, res) => {
  try {
    const item = await Booking.findByPk(req.params.id, {
      include: [{ model: Cart, as: "cart" }, { model: PaymentMethod, as: "payment_method" }, { model: DeliveryMethod, as: "delivery_method" }, { model: Discount, as: "discount" }, { model: TicketStatus, as: "status" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Booking topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET BOOKINGS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateBooking = async (req, res) => {
  try {
    const item = await Booking.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Booking topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Booking muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE BOOKINGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchBooking = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    return res.status(400).json({ success: false, message: "Bu jadvalda qidirish uchun matnli maydon yoq" });
  } catch (error) {
    console.error("SEARCH BOOKINGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const item = await Booking.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Booking topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Booking muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE BOOKINGS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  searchBooking,
  deleteBooking,
};
