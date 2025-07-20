document.addEventListener("DOMContentLoaded", () => {
    const createProductButton = document.getElementById("create-product");
    const modal = document.getElementById("modal-create-prod");
    const closeModalButton = document.querySelector(".close-create-prod");
    const thumbnailButton = document.getElementById("add-thumbnail");
    const thumbnailContainer = document.getElementById("thumbnail-container");

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

    const fileInput = document.getElementById("customFile");
    const imagePreview = document.querySelector(".image-preview .preview");

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

    thumbnailButton.addEventListener("click", () => {
        const currentCount = thumbnailContainer.querySelectorAll(".thumbnail-wrapper").length;

        if (currentCount >= 4) {
            alert("Solo puedes agregar hasta 4 fotos.");
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "thumbnail-wrapper";
        wrapper.style.marginBottom = "10px";

        const input = document.createElement("input");
        input.type = "file";
        input.name = "thumbnails";
        input.accept = "image/*";
        input.className = "file-input";
        input.style.display = "none";

        const preview = document.createElement("img");
        preview.className = "thumbnail-preview";
        preview.style.width = "70px";
        preview.style.height = "70px";
        preview.style.marginTop = "5px";
        preview.style.border = "1px solid #ccc";
        preview.style.borderRadius = "6px";
        preview.style.objectFit = "cover";
        preview.style.cursor = "pointer";
        preview.src =
            "https://vineview.com/wp-content/uploads/2017/07/avatar-no-photo-300x300.png";
        preview.title = "Selecciona una imagen";

        preview.addEventListener("click", () => {
            input.click();
        });

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
    });

    const paginationContainer = document.getElementById('pagination-container');
    const productsBody = document.getElementById('products-body');

    paginationContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('pagination__btn')) {
            e.preventDefault();
            const url = e.target.getAttribute('href');

            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();

                productsBody.innerHTML = "";

                data.productos.forEach(product => {
                    const row = `
                        <tr>
                            <td>${product.title}</td>
                            <td>$ ${product.price}</td>
                            <td>${product.brand}</td>
                            <td>${product.type_product}</td>
                            <td>${product.category}</td>
                            <td><a href="#" class="view__order view__btn" data-id="${product._id}">Ver</a></td>
                        </tr>
                    `;
                    productsBody.insertAdjacentHTML('beforeend', row);
                });

                let pagHtml = "";
                if (data.pagination.hasPrevPage) {
                    pagHtml += `<a href="?page=${data.pagination.prevPage}&limit=${data.pagination.limit}&sort=${data.pagination.sort}&query=${data.pagination.query}" class="pagination__btn">Anterior</a>`;
                }

                pagHtml += `<span class="pagination__current">Página ${data.pagination.currentPage} de ${data.pagination.totalPages}</span>`;

                if (data.pagination.hasNextPage) {
                    pagHtml += `<a href="?page=${data.pagination.nextPage}&limit=${data.pagination.limit}&sort=${data.pagination.sort}&query=${data.pagination.query}" class="pagination__btn">Siguiente</a>`;
                }

                paginationContainer.innerHTML = pagHtml;

            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        }
    });
    
});
