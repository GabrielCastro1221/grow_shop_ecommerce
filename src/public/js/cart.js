document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const cartId = button.dataset.cartId;
            const productId = button.dataset.productId;
            if (!cartId || !productId) {
                return Toastify({
                    text: "IDs no encontrados.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }
            try {
                const res = await fetch(`/api/v1/carts/${cartId}/products/${productId}`, {
                    method: "DELETE"
                });
                const result = await res.json();
                if (res.ok) {
                    Toastify({
                        text: "Producto eliminado del carrito.",
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
            const cartId = emptyCartButton.dataset.cartId;
            if (!cartId) {
                return Toastify({
                    text: "ID del carrito no encontrado.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#ff6b6b"
                }).showToast();
            }
            try {
                const res = await fetch(`/api/v1/carts/${cartId}`, {
                    method: "DELETE"
                });
                const result = await res.json();
                if (res.ok) {
                    Toastify({
                        text: "Carrito vaciado exitosamente.",
                        duration: 2000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#4BB543"
                    }).showToast();
                    setTimeout(() => location.reload(), 1000);

                } else {
                    Toastify({
                        text: result.message || "Error al vaciar el carrito.",
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

    const citySelect = document.getElementById("city");
    const subtotalElement = document.getElementById("subtotal-amount");
    const shippingElement = document.getElementById("shipping-amount");
    const totalElement = document.getElementById("total-amount");

    citySelect.addEventListener("change", () => {
        const shippingCost = parseInt(citySelect.value);
        const subtotalRaw = subtotalElement.textContent.replace(/[^0-9.-]+/g, "");
        const subtotal = parseFloat(subtotalRaw);
        const total = subtotal + shippingCost;
        shippingElement.textContent = `$ ${shippingCost.toLocaleString()}`;
        totalElement.textContent = `$ ${total.toLocaleString()}`;
    });
});
