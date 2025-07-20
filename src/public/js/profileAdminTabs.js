document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".account__tab");
    const tabContents = document.querySelectorAll(".tab__content");

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");

            if (btn.classList.contains("logout-button")) return;

            tabButtons.forEach((b) => b.classList.remove("active__tab"));
            tabContents.forEach((tab) => tab.classList.remove("active-tab"));

            btn.classList.add("active__tab");

            const activeTab = document.querySelector(target);
            if (activeTab) {
                activeTab.classList.add("active-tab");
            }
        });
    });
});
