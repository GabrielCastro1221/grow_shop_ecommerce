document.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById("bar");
    const close = document.getElementById("close");
    const nav = document.getElementById("navbar");

    if (bar) {
        bar.addEventListener("click", () => {
            nav.classList.add("active");
        });
    }

    if (close) {
        close.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    }

    const userData = localStorage.getItem("user");

    if (userData) {
        const user = JSON.parse(userData);
        const role = user.role;
        const cartId = user.cart;
        const wishId = user.wishlist;

        const cartLink = document.querySelector('#lg-bag');
        const wishLink = document.querySelector('#lg-wish');

        if (cartLink && cartId) {
            cartLink.href = `/cart/${cartId}`;
        }

        if (wishLink && wishId) {
            wishLink.href = `/wishlist/${wishId}`;
        }

        const loginLink = document.querySelector('#navbar a[href="/login"]');
        if (loginLink) {
            loginLink.parentElement.remove();
        }

        const miCuentaItem = document.createElement("li");
        const miCuentaLink = document.createElement("a");
        miCuentaLink.href = role === "admin" ? "/perfil-admin" : "/perfil-usuario";
        miCuentaLink.textContent = "Mi Cuenta";
        miCuentaItem.appendChild(miCuentaLink);

        const navList = document.getElementById("navbar");
        const cartItem = document.querySelector("#lg-bag")?.parentElement;

        if (cartItem) {
            navList.insertBefore(miCuentaItem, cartItem);
        } else {
            navList.appendChild(miCuentaItem);
        }
    }
});
