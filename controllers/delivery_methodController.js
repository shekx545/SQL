const { Op } = require("sequelize");
const { DeliveryMethod } = require("../models");

// CREATE
const createDeliveryMethod = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await DeliveryMethod.create({ name });

    return res.status(201).json({
      success: true,
      message: "DeliveryMethod muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE DELIVERY_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getDeliveryMethods = async (req, res) => {
  try {
    const items = await DeliveryMethod.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET DELIVERY_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getDeliveryMethodById = async (req, res) => {
  try {
    const item = await DeliveryMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "DeliveryMethod topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET DELIVERY_METHODS BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateDeliveryMethod = async (req, res) => {
  try {
    const item = await DeliveryMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "DeliveryMethod topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "DeliveryMethod muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE DELIVERY_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchDeliveryMethod = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await DeliveryMethod.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } }
      ] }
    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday delivery_methods topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH DELIVERY_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteDeliveryMethod = async (req, res) => {
  try {
    const item = await DeliveryMethod.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "DeliveryMethod topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "DeliveryMethod muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE DELIVERY_METHODS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  searchDeliveryMethod,
  deleteDeliveryMethod,
};
