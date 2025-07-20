const shippingModel = require("../models/shipping.model");

class ShippinRepository {
    async createShipping(shippingData) {
        try {
            const existingshipping = await shippingModel.findOne({ city: shippingData.city });
            if (existingshipping) {
                throw new Error("La destino ya existe");
            }
            const newShipping = new shippingModel({
                ...shippingData
            });
            await newShipping.save();
            return newShipping;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getShipping() {
        try {
            const shipping = await shippingModel.find({});
            return shipping;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new ShippinRepository();