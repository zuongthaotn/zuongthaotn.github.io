/**
 * Minimal Portfolio - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    initSmoothScroll();

    // Load and render projects from JSON
    loadProjects();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScroll() {
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
}

/**
 * Load projects from JSON file and render table
 */
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderProjectsTable(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Show error message in table
        const tbody = document.querySelector('#projects-table tbody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="5">Error loading projects. Please refresh the page.</td></tr>';
        }
    }
}

/**
 * Render projects table from data
 * @param {Array} projects - Array of project objects
 */
function renderProjectsTable(projects) {
    const tbody = document.querySelector('#projects-table tbody');

    if (!tbody) {
        console.error('Projects table body not found');
        return;
    }

    // Clear existing content
    tbody.innerHTML = '';

    // Render each project
    projects.forEach((project, index) => {
        const row = document.createElement('tr');

        // Number
        const tdNum = document.createElement('td');
        tdNum.textContent = index + 1;
        row.appendChild(tdNum);

        // Name
        const tdName = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = project.name;
        tdName.appendChild(strong);
        row.appendChild(tdName);

        // Description
        const tdDesc = document.createElement('td');
        tdDesc.textContent = project.description;
        row.appendChild(tdDesc);

        // Tech stacks
        const tdTech = document.createElement('td');
        tdTech.textContent = project.tech_stacks;
        row.appendChild(tdTech);

        // Link
        const tdLink = document.createElement('td');
        if (project.link) {
            const link = document.createElement('a');
            link.href = project.link;
            link.target = '_blank';
            link.className = 'table-link';
            link.textContent = 'View →';
            tdLink.appendChild(link);
        }
        row.appendChild(tdLink);

        tbody.appendChild(row);
    });

    console.log(`✅ Rendered ${projects.length} projects`);
}
