const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            await CategoryRepository.createCategory(categoryData);
            res.status(200).json({ message: "Categoria creada exitosamente", user: categoryData });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await CategoryRepository.getCategories();
            if (!categories || categories.length === 0) {
                return res.status(404).json({ message: "No hay categorías disponibles" });
            }
            res.status(200).json({ categories });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CategoryController();
