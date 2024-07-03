document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = document.getElementById('modeIcon');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    modeToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            modeIcon.classList.remove('bi-moon-fill');
            modeIcon.classList.add('bi-brightness-high-fill');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            modeIcon.classList.remove('bi-brightness-high-fill');
            modeIcon.classList.add('bi-moon-fill');
        }
    });

    // Initialize mode based on system preference
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('bi-brightness-high-fill');
        modeIcon.classList.add('bi-moon-fill');
    } else {
        document.body.classList.add('light-mode');
        modeIcon.classList.remove('bi-moon-fill');
        modeIcon.classList.add('brightness-high-fill');
    }
});

