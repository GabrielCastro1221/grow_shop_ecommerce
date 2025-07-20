document.addEventListener("DOMContentLoaded", () => {
    const openUserModalBtn = document.getElementById("create-user");
    const userModal = document.getElementById("modal-create-user");
    const closeUserModalBtn = document.querySelector(".close-create-user");

    openUserModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        userModal.style.display = "block";
    });

    closeUserModalBtn.addEventListener("click", () => {
        userModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === userModal) {
            userModal.style.display = "none";
        }
    });

    const citySelect = document.getElementById("city");

    const colombianCities = [
        "Bogotá",
        "Medellín",
        "Cali",
        "Barranquilla",
        "Cartagena",
        "Manizales",
        "Pereira",
        "Bucaramanga",
        "Santa Marta",
        "Villavicencio",
        "Ibagué",
        "Neiva",
        "Popayán",
        "Sincelejo",
        "Riohacha",
        "Valledupar",
        "Montería"
    ];

    citySelect.innerHTML =
        '<option value="" disabled selected>Selecciona tu ciudad</option>' +
        colombianCities
            .map(
                (city) =>
                    `<option value="${city.toLowerCase().replace(/\s+/g, "-")}">${city}</option>`
            )
            .join("");

    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/v1/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                Toastify({
                    text: result.message || "Usuario creado exitosamente",
                    duration: 2500,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4CAF50",
                    stopOnFocus: true
                }).showToast();

                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            } else {
                throw new Error(result.message || "Error al crear usuario");
            }
        } catch (error) {
            Toastify({
                text: error.message,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
                stopOnFocus: true
            }).showToast();
        }
    });
});
