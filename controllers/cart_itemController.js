const { Op } = require("sequelize");
const { CartItem, Cart, Ticket } = require("../models");

// CREATE
const createCartItem = async (req, res) => {
  try {
    const { ticket_id, cart_id } = req.body;

    const item = await CartItem.create({ ticket_id, cart_id });

    return res.status(201).json({
      success: true,
      message: "CartItem muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE CART_ITEMS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      include: [{ model: Ticket, as: "ticket" }, { model: Cart, as: "cart" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET CART_ITEMS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCartItemById = async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id, {
      include: [{ model: Ticket, as: "ticket" }, { model: Cart, as: "cart" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "CartItem topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET CART_ITEMS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CartItem topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "CartItem muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE CART_ITEMS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCartItem = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    return res.status(400).json({ success: false, message: "Bu jadvalda qidirish uchun matnli maydon yoq" });
  } catch (error) {
    console.error("SEARCH CART_ITEMS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CartItem topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "CartItem muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE CART_ITEMS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  searchCartItem,
  deleteCartItem,
};
