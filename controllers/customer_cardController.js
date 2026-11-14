const { Op } = require("sequelize");
const { CustomerCard, Customer } = require("../models");

// CREATE
const createCustomerCard = async (req, res) => {
  try {
    const { name, phone, number, year, month, is_active, is_main, customer_id } = req.body;

    const item = await CustomerCard.create({ name, phone, number, year, month, is_active, is_main, customer_id });

    return res.status(201).json({
      success: true,
      message: "CustomerCard muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE CUSTOMER_CARDS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCustomerCards = async (req, res) => {
  try {
    const items = await CustomerCard.findAll({
      include: [{ model: Customer, as: "customer" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET CUSTOMER_CARDS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCustomerCardById = async (req, res) => {
  try {
    const item = await CustomerCard.findByPk(req.params.id, {
      include: [{ model: Customer, as: "customer" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerCard topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET CUSTOMER_CARDS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCustomerCard = async (req, res) => {
  try {
    const item = await CustomerCard.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerCard topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "CustomerCard muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE CUSTOMER_CARDS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCustomerCard = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await CustomerCard.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { phone: { [Op.iLike]: `%${query}%` } },
        { number: { [Op.iLike]: `%${query}%` } },
        { year: { [Op.iLike]: `%${query}%` } },
        { month: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Customer, as: "customer" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday customer_cards topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH CUSTOMER_CARDS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteCustomerCard = async (req, res) => {
  try {
    const item = await CustomerCard.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerCard topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "CustomerCard muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE CUSTOMER_CARDS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCustomerCard,
  getCustomerCards,
  getCustomerCardById,
  updateCustomerCard,
  searchCustomerCard,
  deleteCustomerCard,
};
