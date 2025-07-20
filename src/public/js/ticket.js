document.addEventListener("DOMContentLoaded", () => {
    const purchaseBtn = document.querySelector("#subtotal .normal");
    const citySelect = document.getElementById("city");
    const shippingAmountEl = document.getElementById("shipping-amount");
    const subtotalAmountEl = document.getElementById("subtotal-amount");
    const totalAmountEl = document.getElementById("total-amount");

    function updateShipping() {
        const selectedOption = citySelect.options[citySelect.selectedIndex];
        const shipping = parseFloat(selectedOption.value) || 0;
        const subtotal = parseFloat(subtotalAmountEl.textContent.replace(/[$,]/g, "")) || 0;
        const total = subtotal + shipping;

        shippingAmountEl.textContent = `$${shipping}`;
        totalAmountEl.textContent = `$${total}`;
    }

    citySelect.addEventListener("change", updateShipping);

    purchaseBtn.addEventListener("click", async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const cartId = user?.cart;
            const selectedCity = citySelect.options[citySelect.selectedIndex];

            if (!cartId) {
                Toastify({
                    text: "Carrito no encontrado. Inicia sesión nuevamente.",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#f44336"
                }).showToast();
                return;
            }

            if (!selectedCity || !selectedCity.value) {
                Toastify({
                    text: "Selecciona una ciudad de envío válida.",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#f44336"
                }).showToast();
                return;
            }

            const subtotal = parseFloat(subtotalAmountEl.textContent.replace(/[$,]/g, "")) || 0;
            const shipping = parseFloat(selectedCity.value) || 0;
            const amount = subtotal + shipping;
            const ciudad = selectedCity.textContent;

            const response = await fetch(`/api/v1/tickets/cart/${cartId}/finish-purchase`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, shipping, subtotal, ciudad })
            });

            const data = await response.json();

            if (response.ok) {
                Toastify({
                    text: `Compra realizada con éxito 🚀\nCiudad: ${ciudad}\nTicket ID: ${data._id}`,
                    duration: 4500,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#4CAF50"
                }).showToast();

                setTimeout(() => {
                    window.location.href = `/checkout/${data._id}`;
                }, 4600);
            } else {
                Toastify({
                    text: `Error: ${data.error || "No se pudo finalizar la compra"}`,
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "#f44336"
                }).showToast();
            }
        } catch (error) {
            console.error("Error al generar el ticket:", error);
            Toastify({
                text: "Ocurrió un error al procesar tu compra.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "#f44336"
            }).showToast();
        }
    });
});
