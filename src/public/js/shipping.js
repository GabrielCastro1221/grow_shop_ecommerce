document.addEventListener("DOMContentLoaded", async () => {
    const select = document.getElementById("city");

    try {
        const res = await fetch("/api/v1/shipping");
        const data = await res.json();

        if (!data.shipping || data.shipping.length === 0) {
            console.warn("No hay destinos disponibles");
            return;
        }
        select.innerHTML = '<option value="" disabled selected>Selecciona tu ciudad</option>';
        data.shipping.forEach(destino => {
            const option = document.createElement("option");
            option.value = destino.amount;
            option.textContent = destino.city_ship;
            option.setAttribute("data-city", destino.city_ship);
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar ciudades:", error);
    }
});