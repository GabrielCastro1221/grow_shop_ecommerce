const swaggerUiExpress = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "API GROW SHOP – Documentación Oficial",
            description: "API para la tienda en línea GROW SHOP: gestiona y adquiere productos para cultivo interior y exterior, herramientas de jardinería, sistemas hidropónicos, fertilizantes, iluminación, y más. Ideal para integrar funcionalidades de catálogo, carritos de compra, gestión de usuarios y otros servicios relacionados con el mundo del cultivo."
        }
    },
    apis: ["./src/docs/**/*.yaml"]
};

module.exports = swaggerOptions;
