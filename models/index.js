const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const loadModel = (path, modelName) => {
  const exported = require(path);

  if (typeof exported === "function") {
    return exported(sequelize, DataTypes);
  }

  return exported[modelName];
};

const PaymentMethod = loadModel("./payment_method", "PaymentMethod");
const Discount = loadModel("./discount", "Discount");
const DeliveryMethod = loadModel("./delivery_method", "DeliveryMethod");
const TicketStatus = loadModel("./ticket_status", "TicketStatus");
const TicketType = loadModel("./ticket_type", "TicketType");
const Lang = loadModel("./lang", "Lang");
const Types = loadModel("./types", "Types");
const Region = loadModel("./region", "Region");
const Gender = loadModel("./gender", "Gender");
const Sector = loadModel("./sector", "Sector");
const Country = loadModel("./country", "Country");
const Flat = loadModel("./flat", "Flat");
const SeatType = loadModel("./seat_type", "SeatType");
const EventType = loadModel("./event_type", "EventType");
const District = loadModel("./district", "District");
const HumanCategory = loadModel("./human_category", "HumanCategory");
const VenuePhoto = loadModel("./venue_photo", "VenuePhoto");
const Venue = loadModel("./venue", "Venue");
const VenueType = loadModel("./venue_type", "VenueType");
const Seat = loadModel("./seat", "Seat");
const Event = loadModel("./event", "Event");
const Ticket = loadModel("./ticket", "Ticket");
const Customer = loadModel("./customer", "Customer");
const CustomerCard = loadModel("./customer_card", "CustomerCard");
const CustomerAddress = loadModel("./customer_address", "CustomerAddress");
const Admin = loadModel("./admin", "Admin");
const Cart = loadModel("./cart", "Cart");
const CartItem = loadModel("./cart_item", "CartItem");
const Booking = loadModel("./booking", "Booking");

const models = {
  PaymentMethod,
  Discount,
  DeliveryMethod,
  TicketStatus,
  TicketType,
  Lang,
  Types,
  Region,
  Gender,
  Sector,
  Country,
  Flat,
  SeatType,
  EventType,
  District,
  HumanCategory,
  VenuePhoto,
  Venue,
  VenueType,
  Seat,
  Event,
  Ticket,
  Customer,
  CustomerCard,
  CustomerAddress,
  Admin,
  Cart,
  CartItem,
  Booking,
};

EventType.belongsTo(EventType, {
  foreignKey: "parent_event_type_id",
  as: "event_type",
});

District.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
});

HumanCategory.belongsTo(Gender, {
  foreignKey: "gender_id",
  as: "gender",
});

VenuePhoto.belongsTo(Venue, {
  foreignKey: "venue_id",
  as: "venue",
});

Venue.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
});

Venue.belongsTo(District, {
  foreignKey: "district_id",
  as: "district",
});

VenueType.belongsTo(Venue, {
  foreignKey: "venue_id",
  as: "venue",
});

VenueType.belongsTo(Types, {
  foreignKey: "type_id",
  as: "type",
});

Seat.belongsTo(Sector, {
  foreignKey: "sector_id",
  as: "sector",
});

Seat.belongsTo(Venue, {
  foreignKey: "venue_id",
  as: "venue",
});

Seat.belongsTo(SeatType, {
  foreignKey: "seat_type_id",
  as: "seat_type",
});

Event.belongsTo(EventType, {
  foreignKey: "event_type_id",
  as: "event_type",
});

Event.belongsTo(HumanCategory, {
  foreignKey: "human_category_id",
  as: "human_category",
});

Event.belongsTo(Venue, {
  foreignKey: "venue_id",
  as: "venue",
});

Event.belongsTo(Lang, {
  foreignKey: "lang_id",
  as: "lang",
});

Ticket.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
});

Ticket.belongsTo(Seat, {
  foreignKey: "seat_id",
  as: "seat",
});

Ticket.belongsTo(TicketStatus, {
  foreignKey: "status_id",
  as: "status",
});

Ticket.belongsTo(TicketType, {
  foreignKey: "ticket_type_id",
  as: "ticket_type",
});

Customer.belongsTo(Gender, {
  foreignKey: "gender_id",
  as: "gender",
});

Customer.belongsTo(Lang, {
  foreignKey: "lang_id",
  as: "lang",
});

CustomerCard.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

CustomerAddress.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

CustomerAddress.belongsTo(Region, {
  foreignKey: "region_id",
  as: "region",
});

CustomerAddress.belongsTo(District, {
  foreignKey: "district_id",
  as: "district",
});

CustomerAddress.belongsTo(Flat, {
  foreignKey: "flat_id",
  as: "flat",
});

Cart.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

Cart.belongsTo(TicketStatus, {
  foreignKey: "status_id",
  as: "status",
});

CartItem.belongsTo(Ticket, {
  foreignKey: "ticket_id",
  as: "ticket",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
  as: "cart",
});

Booking.belongsTo(Cart, {
  foreignKey: "cart_id",
  as: "cart",
});

Booking.belongsTo(PaymentMethod, {
  foreignKey: "payment_method_id",
  as: "payment_method",
});

Booking.belongsTo(DeliveryMethod, {
  foreignKey: "delivery_method_id",
  as: "delivery_method",
});

Booking.belongsTo(Discount, {
  foreignKey: "discount_id",
  as: "discount",
});

Booking.belongsTo(TicketStatus, {
  foreignKey: "status_id",
  as: "status",
});

module.exports = {
  ...models,
  sequelize,
};