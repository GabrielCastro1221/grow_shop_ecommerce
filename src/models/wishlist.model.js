const { Schema, model } = require("mongoose");

const schema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        },
    ],
});

module.exports = model("Wishlist", schema);
