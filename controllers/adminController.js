const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

const registerAdmin = async (req, res) => {
  try {
    const { name, login, password, is_active, is_creator } = req.body;

    const existing = await Admin.findOne({ where: { login } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Bu login bilan admin allaqachon mavjud",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      login,
      hashed_password,
      is_active,
      is_creator,
    });

    return res.status(201).json({
      success: true,
      message: "Admin muvaffaqiyatli ro'yxatdan o'tdi",
      data: { id: admin.id, name: admin.name, login: admin.login },
    });
  } catch (error) {
    console.error("REGISTER ADMIN ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { login, password } = req.body;

    const admin = await Admin.findOne({ where: { login } });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri" });
    }

    const match = await bcrypt.compare(password, admin.hashed_password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri" });
    }

    const token = jwt.sign(
      { id: admin.id, login: admin.login, is_creator: admin.is_creator },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" },
    );

    return res.status(200).json({ success: true, message: "Muvaffaqiyatli kirildi", token });
  } catch (error) {
    console.error("LOGIN ADMIN ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
      order: [["id", "DESC"]],
    });
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error("GET ADMINS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
    });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin topilmadi" });
    }
    return res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error("GET ADMIN BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin topilmadi" });
    }

    const { name, login, password, is_active, is_creator } = req.body;
    const data = { name, login, is_active, is_creator };
    if (password) {
      data.hashed_password = await bcrypt.hash(password, 10);
    }

    await admin.update(data);

    return res.status(200).json({ success: true, message: "Admin muvaffaqiyatli yangilandi" });
  } catch (error) {
    console.error("UPDATE ADMIN ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Admin.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { login: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: { exclude: ["hashed_password", "hashed_refresh_token"] },
    });

    if (result.length === 0) {
      return res.status(200).json({ success: false, message: "Bunday admin yo'q" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("SEARCH ADMIN ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin topilmadi" });
    }
    await admin.destroy();
    return res.status(200).json({ success: true, message: "Admin muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE ADMIN ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  searchAdmin,
  deleteAdmin,
};
