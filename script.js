document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'https://www.youtube.com./watch?v=dQw4w9WgXcQ';
});
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    themeToggle.checked = true;
    document.body.classList.add('dark-mode');
}