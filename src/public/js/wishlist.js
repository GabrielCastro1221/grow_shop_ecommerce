document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            const wishId = button.dataset.wishId;
            const productId = button.dataset.productId;

            if (!wishId || !productId) {
                return Toastify({
                    text: "IDs no encontrados.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }

            try {
                const res = await fetch(`/api/v1/wishlists/${wishId}/products/${productId}`, {
                    method: "DELETE"
                });
                const result = await res.json();
                if (res.ok) {
                    Toastify({
                        text: "Producto eliminado de favoritos.",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#4BB543"
                    }).showToast();
                    setTimeout(() => location.reload(), 1000);
                } else {
                    Toastify({
                        text: result.message || "Error al eliminar el producto.",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#ff6b6b"
                    }).showToast();
                }
            } catch (err) {
                console.error(err);
                Toastify({
                    text: "Error al conectar con el servidor.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }
        });
    });

    const emptyCartButton = document.querySelector(".btn--empty-cart");

    if (emptyCartButton) {
        emptyCartButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const wishId = emptyCartButton.dataset.wishId;

            if (!wishId) {
                return Toastify({
                    text: "ID del wishlist no encontrado.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }

            try {
                const res = await fetch(`/api/v1/wishlists/${wishId}`, {
                    method: "DELETE"
                });
                const result = await res.json();
                if (res.ok) {
                    Toastify({
                        text: "Favoritos vaciados exitosamente.",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#4BB543"
                    }).showToast();
                    setTimeout(() => location.reload(), 1000);
                } else {
                    Toastify({
                        text: result.message || "Error al vaciar favoritos.",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#ff6b6b"
                    }).showToast();
                }

            } catch (err) {
                console.error(err);
                Toastify({
                    text: "Error al conectar con el servidor.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }
        });
    }
});
