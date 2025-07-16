const ProductRepository = require('../repositories/ProductRepository');

class ProductController {
    async createProd(req, res) {
        try {
            const image = req.files?.image?.[0]?.path || null;
            const thumbnails = req.files?.thumbnails
                ? req.files.thumbnails.map((file) => ({
                    url: file.path,
                    public_id: file.filename,
                }))
                : [];


            const newProd = {
                ...req.body,
                image,
                thumbnails,
            };

            await ProductRepository.createProduct(newProd);
            res.status(201).json({ message: "Producto creado con éxito", product: newProd });
        } catch (error) {
            res.status(500).send("Error al crear producto");
        }
    }

    async getProducts(req, res) {
        try {
            const { page, limit, sort, query } = req.query;
            const products = await ProductRepository.getPaginatedProducts({
                page,
                limit,
                sort,
                query,
            });

            if (products.productos.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        try {
            let photoUrl = req.body.photo;
            if (req.file) {
                photoUrl = req.file.path;
            }

            let thumbnails = req.body.thumbnails || [];
            if (req.files?.thumbnails) {
                thumbnails = req.files.thumbnails.map((file) => ({
                    url: file.path,
                    public_id: file.filename,
                }));
            }

            const updateData = {
                ...req.body,
                image: photoUrl,
                thumbnails: thumbnails,
            };

            const updatedProduct = await ProductRepository.updateProduct(id, updateData);
            res
                .status(200)
                .json({ message: "Producto actualizado", producto: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteProduct = async (req, res) => {
        const pid = req.params.pid;
        try {
            const prod = await ProductRepository.deleteProduct(pid);
            if (!prod) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(200).json({ message: "Producto eliminado", prod });
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }

    async featuredProduct(req, res) {
        const pid = req.params.id;
        try {
            let featured = await ProductRepository.featureProduct(pid);
            if (!featured) {
                return res.status(404).send("Producto no encontrado");
            }
            res.status(200).json(featured);
        } catch (error) {
            res.status(500).send(error.message || "Error al destacar el producto");
        }
    }

    async newArrive(req, res) {
        const pid = req.params.id;
        try {
            let newArrive = await ProductRepository.newArrive(pid);
            if (!newArrive) {
                return res.status(404).send("Producto no encontrado");
            }
            res.status(200).json(newArrive);
        } catch (error) {
            res.status(500).send(error.message || "Error al cambiar a nuevo arribo");
        }
    }

    async bestSeller(req, res) {
        const pid = req.params.id;
        try {
            let bestSeller = await ProductRepository.bestSeller(pid);
            if (!bestSeller) {
                return res.status(404).send("Producto no encontrado");
            }
            res.status(200).json(bestSeller);
        } catch (error) {
            res.status(500).send(error.message || "Error al cambiar a mas vendido");
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query;
            const products = await ProductRepository.searchProducts(query);
            if (products.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No se encontraron productos con ese término" });
            }
            res.status(200).json({ products });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();