const ShippinRepository = require("../repositories/ShippingRepository");

class ShippingController {
    async createShipping(req, res) {
        try {
            const shippingData = req.body;
            await ShippinRepository.createShipping(shippingData);
            res.status(200).json({ message: "Destino creado exitosamente", user: shippingData });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getShipping(req, res) {
        try {
            const shipping = await ShippinRepository.getShipping();
            if (!shipping || shipping.length === 0) {
                return res.status(404).json({ message: "No hay destinos disponibles" });
            }
            res.status(200).json({ shipping });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ShippingController();