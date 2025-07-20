const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
});

const bannerSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    button_text: { type: String },
    image: { type: String },
    background_color: { type: String },
    position: { type: String },
});

const configSchema = new Schema({
    company_name: { type: String, required: true },
    company_logo: { type: String, required: true },
    hero_img: { type: String, required: true },
    hero_title: { type: String, required: true },
    hero_subtitle: { type: String, required: true },
    hero_txt: { type: String, required: true },
    services: {
        type: [serviceSchema],
        validate: [arrayLimit, 'Se requieren al menos 5 servicios'],
        required: true,
    },
    banners: {
        type: [bannerSchema],
        validate: [bannerLimit, 'Se requieren al menos 5 banners'],
        required: true,
    },
});

function arrayLimit(val) {
    return val.length >= 5;
}

function bannerLimit(val) {
    return val.length >= 5;
}

module.exports = model("Config", configSchema);
