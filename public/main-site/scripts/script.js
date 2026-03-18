document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const searchForm = document.getElementById('search-form');
    const mailButton = document.getElementById('mailito');
    const statsButton = document.getElementById('stats');

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- GESTION DU FORMULAIRE (Le Rickroll) ---
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = 'https://www.youtube.com./watch?v=dQw4w9WgXcQ';
        });
    }
    // --- stats.poule-parti.site
    if (statsButton) {
        statsButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'https://stats.poule-parti.site';
        });
    }
    // --- mail.poule-parti.site
    if (mailButton) {
        mailButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'https://mail.poule-parti.site';
        });
    }

});