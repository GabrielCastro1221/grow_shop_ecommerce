let currentPage = 1;
let limit = 6;
let sort = "asc";
let query = null;

const socket = io();
const container = document.getElementById("products-container");
const paginationContainer = document.getElementById("pagination");

const user = JSON.parse(localStorage.getItem("user")) || {};
const cartId = user.cart;
const wishId = user.wishlist;

const badgeColorMap = {
    "destacado": "light-pink",
    "nuevo arribo": "light-green",
    "más vendido": "light-orange"
};

socket.emit("getPaginatedProducts", {
    page: currentPage,
    limit,
    sort,
    query,
});

socket.on("products", ({ productos, pagination }) => {
    renderProducts(productos);
    renderPagination(pagination);
});

function renderProducts(productos) {
    container.innerHTML = "";

    productos.forEach((prod) => {
        const typeNormalized = prod.type_product?.toLowerCase() || "";
        const badgeClass = badgeColorMap[typeNormalized] || 'light-blue';

        const productHTML = `
            <div class="product__item">
                <div class="product__banner">
                    <a href="/tienda/${prod._id}" class="product__images">
                        <img src="${prod.image}" alt="${prod.title}" class="product__img default">
                        <img src="${prod.image}" alt="${prod.title}" class="product__img hover">
                    </a>

                    <div class="product__actions">
                        <a href="/tienda/${prod._id}" class="action__btn" aria-label="Detalle del producto">
                            <i class="fi fi-rr-eye"></i>
                        </a>
                        <form action="/api/v1/wishlists/${wishId}/products/${prod._id}" method="POST" class="add-to-wish-form">
                            <button type="submit" class="action__btn" aria-label="Añadir a favoritos">
                                <i class="fi fi-rr-heart"></i>
                            </button>
                        </form>
                        <a href="#" class="action__btn share__btn" aria-label="Compartir"
                        data-id="${prod._id}" data-title="${prod.title}" data-image="${prod.image}">
                            <i class="fi fi-rr-share"></i>
                        </a>
                    </div>

                    <div class="product__badge ${badgeClass}">
                        ${prod.type_product}
                    </div>
                </div>

                <div class="product__content">
                    <span class="product__category">${prod.category || "Sin categoría"}</span>
                    <a href="/tienda/${prod._id}">
                        <h3 class="product__title">${prod.title}</h3>
                    </a>

                    <div class="product__price flex">
                        <span class="new__price">$${prod.price}</span>
                    </div>

                    <form action="/api/v1/carts/${cartId}/products/${prod._id}" method="POST" class="add-to-cart-form">
                        <button type="submit" class="action__btn cart__btn" aria-label="Añadir al carrito">
                            <i class="fi fi-rr-shopping-cart"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;

        container.innerHTML += productHTML;
    });
}

function renderPagination(pagination) {
    const {
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        currentPage: page
    } = pagination;

    let html = `<ul>`;

    if (hasPrevPage) {
        html += `
            <li>
                <a href="#" class="pagination__link icon" data-page="${prevPage}" aria-label="Página anterior">
                    <i class="fi fi-rr-angle-double-left"></i>
                </a>
            </li>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li>
                <a href="#" class="pagination__link ${i === page ? "active" : ""}" data-page="${i}" aria-label="Ir a la página ${i}">
                    ${i}
                </a>
            </li>`;
    }

    if (hasNextPage) {
        html += `
            <li>
                <a href="#" class="pagination__link icon" data-page="${nextPage}" aria-label="Página siguiente">
                    <i class="fi fi-rr-angle-double-right"></i>
                </a>
            </li>`;
    }

    html += `</ul>`;
    paginationContainer.innerHTML = html;

    document.querySelectorAll(".pagination__link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = parseInt(link.dataset.page);
            if (!isNaN(page)) {
                currentPage = page;
                socket.emit("getPaginatedProducts", {
                    page: currentPage,
                    limit,
                    sort,
                    query
                });
            }
        });
    });
}
