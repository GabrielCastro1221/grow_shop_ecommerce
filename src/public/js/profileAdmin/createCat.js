const modal = document.getElementById("modal-create-cat");
const openBtn = document.getElementById("create-cat");
const closeBtn = document.querySelector(".close-create-cat");
const form = document.getElementById("register-for");

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
    const categoryName = document.getElementById("category").value.trim();

    if (!categoryName) {
        return Toastify({
            text: "El nombre de la categoría es requerido",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e74c3c",
        }).showToast();
    }

    try {
        const res = await fetch("/api/v1/categories/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: categoryName })
        });

        const data = await res.json();
        if (res.ok) {
            Toastify({
                text: "Categoría creada exitosamente",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#27ae60",
            }).showToast();

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            Toastify({
                text: data.message || "Error al crear categoría",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#e67e22",
            }).showToast();
        }
    } catch (err) {
        console.error(err);
        Toastify({
            text: "Error de red",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#e74c3c",
        }).showToast();
    }
});