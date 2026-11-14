const { Op } = require("sequelize");
const { CustomerAddress, Customer, District, Flat, Region } = require("../models");

// CREATE
const createCustomerAddress = async (req, res) => {
  try {
    const { name, street, house, location, post_index, info, customer_id, region_id, district_id, flat_id } = req.body;

    const item = await CustomerAddress.create({ name, street, house, location, post_index, info, customer_id, region_id, district_id, flat_id });

    return res.status(201).json({
      success: true,
      message: "CustomerAddress muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE CUSTOMER_ADDRESSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCustomerAddresss = async (req, res) => {
  try {
    const items = await CustomerAddress.findAll({
      include: [{ model: Customer, as: "customer" }, { model: Region, as: "region" }, { model: District, as: "district" }, { model: Flat, as: "flat" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET CUSTOMER_ADDRESSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCustomerAddressById = async (req, res) => {
  try {
    const item = await CustomerAddress.findByPk(req.params.id, {
      include: [{ model: Customer, as: "customer" }, { model: Region, as: "region" }, { model: District, as: "district" }, { model: Flat, as: "flat" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerAddress topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET CUSTOMER_ADDRESSES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCustomerAddress = async (req, res) => {
  try {
    const item = await CustomerAddress.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerAddress topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "CustomerAddress muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE CUSTOMER_ADDRESSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCustomerAddress = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await CustomerAddress.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { street: { [Op.iLike]: `%${query}%` } },
        { house: { [Op.iLike]: `%${query}%` } },
        { location: { [Op.iLike]: `%${query}%` } },
        { post_index: { [Op.iLike]: `%${query}%` } },
        { info: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Customer, as: "customer" }, { model: Region, as: "region" }, { model: District, as: "district" }, { model: Flat, as: "flat" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday customer_addresses topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH CUSTOMER_ADDRESSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteCustomerAddress = async (req, res) => {
  try {
    const item = await CustomerAddress.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "CustomerAddress topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "CustomerAddress muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE CUSTOMER_ADDRESSES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCustomerAddress,
  getCustomerAddresss,
  getCustomerAddressById,
  updateCustomerAddress,
  searchCustomerAddress,
  deleteCustomerAddress,
};
