const { Op } = require("sequelize");
const { Discount } = require("../models");

// CREATE
const createDiscount = async (req, res) => {
  try {
    const { discount, finish_date } = req.body;

    const item = await Discount.create({ discount, finish_date });

    return res.status(201).json({
      success: true,
      message: "Discount muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE DISCOUNTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getDiscounts = async (req, res) => {
  try {
    const items = await Discount.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET DISCOUNTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getDiscountById = async (req, res) => {
  try {
    const item = await Discount.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Discount topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET DISCOUNTS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateDiscount = async (req, res) => {
  try {
    const item = await Discount.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Discount topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Discount muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE DISCOUNTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchDiscount = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Discount.findAll({
      where: { [Op.or]: [
        { discount: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday discounts topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH DISCOUNTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteDiscount = async (req, res) => {
  try {
    const item = await Discount.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Discount topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Discount muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE DISCOUNTS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  searchDiscount,
  deleteDiscount,
};
