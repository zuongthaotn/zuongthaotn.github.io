/**
 * Minimal Portfolio - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));

                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, null, href);
                }
            }
        });
    });
});
