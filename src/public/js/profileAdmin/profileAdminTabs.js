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
});
