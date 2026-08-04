document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('home');

    // --- stats.poule-parti.site
    if (homeButton) {
        homeButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'https://poule-parti.site';
        });
    }
});