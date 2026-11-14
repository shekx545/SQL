const { Op } = require("sequelize");
const { PaymentMethod } = require("../models");

// CREATE
const createPaymentMethod = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await PaymentMethod.create({ name });

    return res.status(201).json({
      success: true,
      message: "PaymentMethod muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE PAYMENT_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getPaymentMethods = async (req, res) => {
  try {
    const items = await PaymentMethod.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET PAYMENT_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getPaymentMethodById = async (req, res) => {
  try {
    const item = await PaymentMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "PaymentMethod topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET PAYMENT_METHODS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updatePaymentMethod = async (req, res) => {
  try {
    const item = await PaymentMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "PaymentMethod topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "PaymentMethod muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE PAYMENT_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchPaymentMethod = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await PaymentMethod.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday payment_methods topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH PAYMENT_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deletePaymentMethod = async (req, res) => {
  try {
    const item = await PaymentMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "PaymentMethod topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "PaymentMethod muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE PAYMENT_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  searchPaymentMethod,
  deletePaymentMethod,
};
