document.addEventListener("DOMContentLoaded", () => {
    const createProductButton = document.getElementById("create-product");
    const modal = document.getElementById("modal-create-prod");
    const closeModalButton = document.querySelector(".close-create-prod");
    const form = document.getElementById("form");
    const fileInput = document.getElementById("customFile");
    const imagePreview = document.querySelector(".image-preview .preview");
    const thumbnailContainer = document.getElementById("thumbnail-container");

    const toast = (text, bg = "#28a745") => {
        Toastify({
            text,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: bg,
            stopOnFocus: true
        }).showToast();
    };

    createProductButton.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = "flex";
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    thumbnailContainer.addEventListener("click", (e) => {
        if (e.target && e.target.id === "add-thumbnail") {
            const currentCount = thumbnailContainer.querySelectorAll(".thumbnail-wrapper").length;
            if (currentCount >= 4) {
                toast("Solo puedes agregar hasta 4 fotos.", "#dc3545");
                return;
            }

            const wrapper = document.createElement("div");
            wrapper.className = "thumbnail-wrapper";
            wrapper.style.marginBottom = "10px";

            const input = document.createElement("input");
            input.type = "file";
            input.name = "thumbnails";
            input.accept = "image/*";
            input.style.display = "none";

            const preview = document.createElement("img");
            preview.className = "thumbnail-preview";
            preview.src = "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png";
            preview.style.cssText = `
                width: 70px;
                height: 70px;
                margin-top: 5px;
                border: 1px solid #ccc;
                border-radius: 6px;
                object-fit: cover;
                cursor: pointer;
            `;

            preview.addEventListener("click", () => input.click());

            input.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });

            wrapper.appendChild(preview);
            wrapper.appendChild(input);
            thumbnailContainer.appendChild(wrapper);
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", document.getElementById("title").value);
        formData.append("price", document.getElementById("price").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("brand", document.getElementById("brand").value);
        formData.append("stock", document.getElementById("stock").value);
        formData.append("category", form.querySelector("select[name='category']").value);
        formData.append("type_product", form.querySelector("select[name='type_product']").value);

        if (fileInput.files[0]) {
            formData.append("image", fileInput.files[0]);
        }

        const thumbnails = thumbnailContainer.querySelectorAll("input[type='file'][name='thumbnails']");
        thumbnails.forEach((input) => {
            if (input.files[0]) {
                formData.append("thumbnails", input.files[0]);
            }
        });

        try {
            const response = await fetch("/api/v1/products/create", {
                method: "POST",
                body: formData
            });

            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error al crear producto:", errorText);
                toast("Error al crear producto", "#dc3545");
                return;
            }

            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                toast("Producto creado correctamente.");
            } else {
                const text = await response.text();
                console.warn("Respuesta inesperada (no JSON):", text);
                toast("Producto creado, pero la respuesta no fue JSON", "#ffc107");
            }

            form.reset();
            modal.style.display = "none";
            imagePreview.src = "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png";
            thumbnailContainer.innerHTML = `<button type="button" id="add-thumbnail" class="create-prod">Agregar Fotos</button>`;

        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast("Error inesperado al crear el producto.", "#dc3545");
        }
    });
});
