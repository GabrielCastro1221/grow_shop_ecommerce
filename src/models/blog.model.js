const { Schema, model } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    summary: { type: String },
    banner_img: { type: String },
    blog_thumbnail: [
        {
            url: { type: String, },
            public_id: { type: String, },
        },
    ],
    published_at: { type: Date },
    created_at: { type: Date, default: Date.now },
});

module.exports = model("Blog", schema);
