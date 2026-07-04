// Apple-Style Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const mainLogo = document.getElementById('main-logo');

// Check local storage for theme
const savedTheme = localStorage.getItem('apple-portfolio-theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateLogo(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('apple-portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    updateLogo(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

function updateLogo(theme) {
    if (theme === 'dark') {
        mainLogo.src = 'assets/1.png';
    } else {
        mainLogo.src = 'assets/2.png';
    }
}

// Animations are now fully CSS-based for maximum performance on mobile.

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if(icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// Scroll Spy for Navigation Links
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const scrollSpyOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, scrollSpyOptions);

sections.forEach(sec => scrollSpyObserver.observe(sec));

// Handle Window Resize Bug for Mobile Menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if(icon) {
            icon.className = 'fas fa-bars';
        }
    }
});
