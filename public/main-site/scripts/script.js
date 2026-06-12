document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const mailButton = document.getElementById('mailito');
    const statsButton = document.getElementById('stats');
    const gogoleButton = document.getElementById('gogole');
    const cloudButton = document.getElementById('cloud');

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
    // --- gogole.poule-parti.site
    if(gogoleButton) {
        gogoleButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'https://gogole.poule-parti.site';
        })
    }
    // --- cloud.poule-parti.site
    if (cloudButton) {
        cloudButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'https://cloud.poule-parti.site';
        });
    }
});