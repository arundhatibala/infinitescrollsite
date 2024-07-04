document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a');

    document.addEventListener('mousemove', (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            document.body.classList.add('link-hovered');
        });

        link.addEventListener('mouseout', () => {
            document.body.classList.remove('link-hovered');
        });
    });
});
