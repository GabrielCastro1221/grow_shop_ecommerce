document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("update-form");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        console.warn("No hay datos de usuario en localStorage.");
        return;
    }

    const fillField = (id, value) => {
        const input = document.getElementById(id);
        if (input) input.value = value || "";
    };

    fillField("name-update", user.name);
    fillField("last-name-update", user.last_name);
    fillField("email-update", user.email);
    fillField("age-update", user.age);
    fillField("phone-update", user.phone);
    fillField("address-update", user.address);
    fillField("gender-update", user.gender);
    fillField("city-update", user.city?.toLowerCase());
    fillField("role-update", user.role);

    if (!localStorage.getItem("user_id") && user.id) {
        localStorage.setItem("user_id", user.id);
    }

    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(updateForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/v1/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `Error ${response.status}: ${response.statusText}`);
            }

            Toastify({
                text: result.message || "Usuario actualizado con éxito.",
                duration: 3000,
                gravity: "top",
                position: "right",
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                close: true,
            }).showToast();

            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Toastify({
                text: error.message || "Ocurrió un error al actualizar el usuario.",
                duration: 3000,
                gravity: "top",
                position: "right",
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                close: true,
            }).showToast();
        }
    });
});
