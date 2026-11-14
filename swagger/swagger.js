const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function setupSwagger(app) {
    const swaggerDocs = swaggerJsdoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Exam API",
                version: "1.0.0",
            },
            servers: [
                {
                    url: "http://localhost:5001",
                },
            ],
        },
        apis: ["./routes/*.js"],
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

module.exports = setupSwagger;
