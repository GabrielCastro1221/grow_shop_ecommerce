document.addEventListener("DOMContentLoaded", async () => {
    const categorySelect = document.querySelector('select[name="category"]');

    try {
        const response = await fetch("/api/v1/categories");
        if (!response.ok) throw new Error("Error al obtener categorías");

        const data = await response.json();
        const categories = data.categories;
        categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';

        categories.forEach((cat) => {
            const option = document.createElement("option");
            option.value = cat.category;
            option.textContent = cat.category;
            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error cargando categorías:", error.message);
    }
});