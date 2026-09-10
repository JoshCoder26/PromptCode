function changeTab(targetId, newTitle) {
    document.title = newTitle;
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Horizontal scroll animation for nav
    animateNavScroll(targetId);
}

function animateNavScroll(targetId) {
    const nav = document.querySelector('nav');
    const links = document.querySelectorAll('nav a');
    let targetLink = null;
    
    links.forEach(link => {
        if (link.getAttribute('href') === targetId) {
            targetLink = link;
        }
    });
    
    if (targetLink) {
        setTimeout(() => {
            const linkOffsetLeft = targetLink.offsetLeft;
            const navWidth = nav.clientWidth;
            const linkWidth = targetLink.offsetWidth;
            
            // Calculate the scroll position to center the link
            const scrollPosition = linkOffsetLeft - (navWidth / 2) + (linkWidth / 2);
            
            // Animate the scroll using requestAnimationFrame for smoothness
            nav.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 0);
    }
}

// Dit zijn de functies die jouw HTML aanroept via onclick
function displayHome() {
    changeTab('#home', "Home - PromptCode");
}

function displayAbout() {
    changeTab('#about', "About - PromptCode");
}

function displayForm() {
    changeTab('#form', "Request code writing/enhancing/debugging");
}

// Check URL hash on page load and navigate to appropriate tab
function initializePageFromHash() {
    const hash = window.location.hash;
    
    if (hash === '#about') {
        displayAbout();
    } else if (hash === '#form') {
        displayForm();
    } else {
        displayHome();
    }
}

// Initialize on page load
window.addEventListener('load', initializePageFromHash);

// Also handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash === '#home') displayHome();
    else if (hash === '#about') displayAbout();
    else if (hash === '#form') displayForm();
});

// Prevent horizontal scrolling
document.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

// Also prevent touchmove horizontal scroll
let lastX = 0;
document.addEventListener('touchstart', function(e) {
    lastX = e.touches[0].clientX;
}, false);

document.addEventListener('touchmove', function(e) {
    const currentX = e.touches[0].clientX;
    const diffX = Math.abs(currentX - lastX);
    const diffY = Math.abs(e.touches[0].clientY - (e.touches[0].clientY || 0));
    
    if (diffX > diffY) {
        e.preventDefault();
    }
    lastX = currentX;
}, { passive: false });
