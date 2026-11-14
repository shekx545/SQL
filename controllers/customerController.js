const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Customer, Gender, Lang } = require("../models");

const includeRefs = [
  { model: Gender, as: "gender" },
  { model: Lang, as: "lang" },
];

// CREATE (register)
const registerCustomer = async (req, res) => {
  try {
    const { first_name, last_name, phone, password, email, birth_date, gender_id, lang_id } = req.body;

    const existing = await Customer.findOne({ where: { [Op.or]: [{ phone }, { email }] } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bu telefon yoki email bilan mijoz allaqachon mavjud",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      first_name,
      last_name,
      phone,
      hashed_password,
      email,
      birth_date,
      gender_id,
      lang_id,
    });

    return res.status(201).json({
      success: true,
      message: "Mijoz muvaffaqiyatli ro'yxatdan o'tdi",
      data: { id: customer.id, first_name: customer.first_name, phone: customer.phone },
    });
  } catch (error) {
    console.error("REGISTER CUSTOMER ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const loginCustomer = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const customer = await Customer.findOne({ where: { phone } });
    if (!customer) {
      return res.status(401).json({ success: false, message: "Telefon yoki parol noto'g'ri" });
    }

    const match = await bcrypt.compare(password, customer.hashed_password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Telefon yoki parol noto'g'ri" });
    }

    const token = jwt.sign(
      { id: customer.id, phone: customer.phone },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    );

    return res.status(200).json({ success: true, message: "Muvaffaqiyatli kirildi", token });
  } catch (error) {
    console.error("LOGIN CUSTOMER ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
      include: includeRefs,
      order: [["id", "DESC"]],
    });
    return res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
      include: includeRefs,
    });
    if (!customer) {
      return res.status(404).json({ success: false, message: "Mijoz topilmadi" });
    }
    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error("GET CUSTOMER BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Mijoz topilmadi" });
    }

    const { first_name, last_name, phone, password, email, birth_date, gender_id, lang_id } = req.body;
    const data = { first_name, last_name, phone, email, birth_date, gender_id, lang_id };
    if (password) {
      data.hashed_password = await bcrypt.hash(password, 10);
    }
    Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

    await customer.update(data);

    return res.status(200).json({ success: true, message: "Mijoz muvaffaqiyatli yangilandi" });
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchCustomer = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Customer.findAll({
      where: {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${query}%` } },
          { last_name: { [Op.iLike]: `%${query}%` } },
          { phone: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
      include: includeRefs,
    });

    if (result.length === 0) {
      return res.status(200).json({ success: false, message: "Bunday mijoz yo'q" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH CUSTOMER ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Mijoz topilmadi" });
    }
    await customer.destroy();
    return res.status(200).json({ success: true, message: "Mijoz muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE CUSTOMER ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  searchCustomer,
  deleteCustomer,
};
