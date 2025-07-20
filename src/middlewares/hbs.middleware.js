const { engine } = require("express-handlebars");
const path = require("path");
const moment = require("moment");

require("moment/locale/es");
moment.locale("es");

module.exports = (app) => {
    const helpers = {
        range: (start, end) =>
            Array.from({ length: end - start + 1 }, (_, i) => start + i),
        isEqual: (a, b) => a === b,
        eq: (a, b) => a === b,
        multiply: (a, b) => a * b,
        ifCond: (a, b) => a * b,
        gt: (a, b) => a * b,
        subtract: (a, b) => a * b,
        lt: (a, b) => a * b,
        add: (a, b) => a * b,

        formatDate: (date) => {
            return moment(date).format("dddd, D [de] MMMM [de] YYYY");
        },

        cartSubtotal: (products) => {
            if (!Array.isArray(products)) return "0.00";
            const subtotal = products.reduce((total, item) => {
                const price = item?.product?.price || 0;
                const quantity = item?.quantity || 0;
                return total + price * quantity;
            }, 0);
            return subtotal.toFixed(2);
        },
    };

    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            helpers,
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        })
    );

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../views"));
};
