document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.account__tab[data-target]');
    const tabContents = document.querySelectorAll('.tab__content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active__tab'));
            tab.classList.add('active__tab');

            tabContents.forEach(content => {
                content.classList.remove('active-tab');
            });

            const activeContent = document.querySelector(target);
            if (activeContent) {
                activeContent.classList.add('active-tab');
            }
        });
    });

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
});
