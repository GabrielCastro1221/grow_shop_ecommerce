const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerOptions = require("./swagger.middleware");
const viewsRouter = require("../routes/views.routes");
const userRouter = require("../routes/user.routes");
const uploadFileRouter = require("../routes/uploadFile.routes");
const productRouter = require("../routes/product.routes");

const specs = swaggerJsDoc(swaggerOptions);

const setupRoutes = (app) => {
    app.use("/", viewsRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/", uploadFileRouter);
    app.use("/api/v1/products", productRouter);
    
    app.use("/api-docs",
        swaggerUiExpress.serve,
        swaggerUiExpress.setup(specs)
    );
};

module.exports = setupRoutes;
