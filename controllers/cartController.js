const { Op } = require("sequelize");
const { Cart, Customer, TicketStatus } = require("../models");

// CREATE
const createCart = async (req, res) => {
  try {
    const { customer_id, status_id } = req.body;

    const item = await Cart.create({ customer_id, status_id });

    return res.status(201).json({
      success: true,
      message: "Cart muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE CARTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCarts = async (req, res) => {
  try {
    const items = await Cart.findAll({
      include: [{ model: Customer, as: "customer" }, { model: TicketStatus, as: "status" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET CARTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCartById = async (req, res) => {
  try {
    const item = await Cart.findByPk(req.params.id, {
      include: [{ model: Customer, as: "customer" }, { model: TicketStatus, as: "status" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET CARTS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCart = async (req, res) => {
  try {
    const item = await Cart.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Cart muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE CARTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCart = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    return res.status(400).json({ success: false, message: "Bu jadvalda qidirish uchun matnli maydon yoq" });
  } catch (error) {
    console.error("SEARCH CARTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const item = await Cart.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Cart muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE CARTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  searchCart,
  deleteCart,
};
