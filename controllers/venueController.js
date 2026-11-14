const { Op } = require("sequelize");
const { Venue, District, Region } = require("../models");

// CREATE
const createVenue = async (req, res) => {
  try {
    const { name, address, location, site, phone, schema, region_id, district_id } = req.body;

    const item = await Venue.create({ name, address, location, site, phone, schema, region_id, district_id });

    return res.status(201).json({
      success: true,
      message: "Venue muvaffaqiyatli qo'shildi",
      data: item,
    });
  } catch (error) {
    console.error("CREATE VENUES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
const getVenues = async (req, res) => {
  try {
    const items = await Venue.findAll({
      include: [{ model: Region, as: "region" }, { model: District, as: "district" }],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("GET VENUES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
const getVenueById = async (req, res) => {
  try {
    const item = await Venue.findByPk(req.params.id, {
      include: [{ model: Region, as: "region" }, { model: District, as: "district" }],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "Venue topilmadi" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("GET VENUES BY ID ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateVenue = async (req, res) => {
  try {
    const item = await Venue.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Venue topilmadi" });
    }

    await item.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Venue muvaffaqiyatli yangilandi",
      data: item,
    });
  } catch (error) {
    console.error("UPDATE VENUES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SEARCH
const searchVenue = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, message: "Invalid search query" });
    }

    const result = await Venue.findAll({
      where: { [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { address: { [Op.iLike]: `%${query}%` } },
        { location: { [Op.iLike]: `%${query}%` } },
        { site: { [Op.iLike]: `%${query}%` } },
        { phone: { [Op.iLike]: `%${query}%` } },
        { schema: { [Op.iLike]: `%${query}%` } }
      ] },
      include: [{ model: Region, as: "region" }, { model: District, as: "district" }],

    });

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Bunday venues topilmadi" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("SEARCH VENUES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteVenue = async (req, res) => {
  try {
    const item = await Venue.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Venue topilmadi" });
    }

    await item.destroy();

    return res.status(200).json({ success: true, message: "Venue muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("DELETE VENUES ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  searchVenue,
  deleteVenue,
};
