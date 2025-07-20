document.addEventListener("DOMContentLoaded", async () => {
    const addressContainer = document.querySelector(".address");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
        return (addressContainer.innerHTML = "<p>Inicia sesión para ver tu perfil.</p>");
    }

    try {
        const response = await fetch("/api/v1/users/profile/me", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "No se pudo cargar el perfil");
        }

        const data = result.data;

        addressContainer.innerHTML = `
            <ul class="profile-data">
                <li><strong>Nombre:</strong> ${data.name}</li>
                <li><strong>Apellido:</strong> ${data.last_name}</li>
                <li><strong>Correo:</strong> ${data.email}</li>
                <li><strong>Teléfono:</strong> ${data.phone}</li>
                <li><strong>Edad:</strong> ${data.age}</li>
                <li><strong>Género:</strong> ${data.gender}</li>
                <li><strong>Dirección:</strong> ${data.address}</li>
                <li><strong>Ciudad:</strong> ${data.city}</li>
                <li><strong>Newsletter:</strong> ${data.newsletter}</li>
                <li><strong>Rol:</strong> ${data.role}</li>
                <li><strong>Fecha de Registro:</strong> ${new Date(data.createdAt).toLocaleDateString("es-CO")}</li>
            </ul>
        `;
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        addressContainer.innerHTML = `<p>Error al cargar perfil: ${error.message}</p>`;
    }

    const logoutButtons = document.querySelectorAll(".logout-button");

    logoutButtons.forEach(button => {
        button.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro de cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("user_name");
                    localStorage.removeItem("user_last_name");
                    window.location.href = "/login";
                }
            });
        });
    });

    const deleteAccountButtons = document.querySelectorAll(".delete-button");

    deleteAccountButtons.forEach(button => {
        button.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro de eliminar tu cuenta?",
                text: "¡Esta acción no se puede deshacer!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const userId = JSON.parse(localStorage.getItem("user"))?._id;
                    if (!userId) {
                        Swal.fire("Error", "No se encontró tu ID de usuario.", "error");
                        return;
                    }

                    try {
                        const response = await fetch(`/api/v1/users/${userId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status} - ${response.statusText}`);
                        }

                        const result = await response.json();
                        Swal.fire("Cuenta eliminada", result.message || "Tu cuenta ha sido eliminada con éxito.", "success").then(() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        });
                    } catch (error) {
                        console.error("Error al eliminar cuenta:", error);
                        Swal.fire("Error", error.message || "No se pudo eliminar la cuenta.", "error");
                    }
                }
            });
        });
    });
});
