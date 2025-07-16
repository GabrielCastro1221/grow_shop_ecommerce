const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    wishlist: { type: Schema.Types.ObjectId, ref: "Wishlist" },
    role: { type: String, enum: ["admin", "usuario"], default: "usuario" },
    gender: { type: String, enum: ["masculino", "femenino"] },
    newsletter: {
      type: String,
      enum: ["suscrito", "no suscrito"],
      default: "no suscrito",
    },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    token_reset: { token: String, expire: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.plugin(mongoosePaginate);

module.exports = model("User", schema);
