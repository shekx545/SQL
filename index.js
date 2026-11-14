const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { sequelize } = require("./config/database");

require("./models");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.use("/api/payment_method",
require("./routes/payment_methodRoute"));

app.use("/api/discount",
require("./routes/discountRoute"));

app.use("/api/delivery_method",
require("./routes/delivery_methodRoute"));

app.use("/api/ticket_status",
require("./routes/ticket_statusRoute"));

app.use("/api/ticket_type",
require("./routes/ticket_typeRoute"));

app.use("/api/lang",
require("./routes/langRoute"));

app.use("/api/types",
require("./routes/typesRoute"));

app.use("/api/region",
require("./routes/regionRoute"));

app.use("/api/gender",
require("./routes/genderRoute"));

app.use("/api/sector",
require("./routes/sectorRoute"));

app.use("/api/country",
require("./routes/countryRoute"));

app.use("/api/flat",
require("./routes/flatRoute"));

app.use("/api/seat_type",
require("./routes/seat_typeRoute"));

app.use("/api/event_type",
require("./routes/event_typeRoute"));

app.use("/api/district",
require("./routes/districtRoute"));

app.use("/api/human_category",
require("./routes/human_categoryRoute"));

app.use("/api/venue_photo",
require("./routes/venue_photoRoute"));

app.use("/api/venue",
require("./routes/venueRoute"));

app.use("/api/venue_type",
require("./routes/venue_typeRoute"));

app.use("/api/seat",
require("./routes/seatRoute"));

app.use("/api/event",
require("./routes/eventRoute"));

app.use("/api/ticket",
require("./routes/ticketRoute"));

app.use("/api/customer",
require("./routes/customerRoute"));

app.use("/api/customer_card",
require("./routes/customer_cardRoute"));

app.use("/api/customer_address",
require("./routes/customer_addressRoute"));

app.use("/api/admin",
require("./routes/adminRoute"));

app.use("/api/cart",
require("./routes/cartRoute"));

app.use("/api/cart_item",
require("./routes/cart_itemRoute"));

app.use("/api/booking",
require("./routes/bookingRoute"));

const setupSwagger = require("./swagger/swagger");
setupSwagger(app);

const PORT = process.env.PORT || 5001;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database error:", error.message);
    });

module.exports = app;
