document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".account__tab");
    const contents = document.querySelectorAll(".tab__content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.getAttribute("data-target");

            tabs.forEach(t => t.classList.remove("active__tab"));
            tab.classList.add("active__tab");

            contents.forEach(content => content.classList.remove("active-tab"));

            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                targetContent.classList.add("active-tab");
            }
        });
    });
});