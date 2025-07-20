document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-create-ship");
    const openBtn = document.getElementById("create-ship");
    const closeBtn = document.querySelector(".close-create-ship");
    const form = document.getElementById("register-fo");

    openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const cityName = document.getElementById("city_ship").value.trim();
        const shippingCostInput = document.getElementById("amount").value.trim();
        const shippingCost = parseFloat(shippingCostInput);
        if (!cityName || isNaN(shippingCost)) {
            return Toastify({
                text: "Todos los campos son requeridos",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#e74c3c"
            }).showToast();
        }

        try {
            const res = await fetch("/api/v1/shipping/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ city_ship: cityName, amount: shippingCost })
            });

            const data = await res.json();

            if (res.ok) {
                Toastify({
                    text: "Destino creado exitosamente",
                    duration: 2500,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#2ecc71"
                }).showToast();

                form.reset();
                modal.style.display = "none";

                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                Toastify({
                    text: data.message || "Error al crear destino",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#e67e22"
                }).showToast();
            }
        } catch (error) {
            console.error(error);
            Toastify({
                text: "Error de red",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#e74c3c"
            }).showToast();
        }
    });
});
