function changeTab(targetId, newTitle) {
    document.title = newTitle;
    
    // Get all sections and find current and target
    const allSections = document.querySelectorAll('section');
    let currentSection = null;
    let targetSection = null;
    let currentIndex = 0;
    let targetIndex = 0;
    
    allSections.forEach((section, index) => {
        if (section.classList.contains('active')) {
            currentSection = section;
            currentIndex = index;
        }
        if (section.id === targetId.substring(1)) { // Remove # from targetId
            targetSection = section;
            targetIndex = index;
        }
    });
    
    if (!targetSection) return;
    
    // Calculate direction and distance
    const isMovingRight = targetIndex > currentIndex;
    const distance = Math.abs(targetIndex - currentIndex);
    
    // Speed: 1 second total, regardless of distance
    const duration = 1000; // 1 second in milliseconds
    
    // Animate the page scroll
    animatePageScroll(currentIndex, targetIndex, duration);
    
    // Remove active class from all sections and add to target
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    targetSection.classList.add('active');
}

function animatePageScroll(fromIndex, toIndex, duration) {
    const sections = document.querySelectorAll('section');
    const body = document.documentElement;
    
    // Calculate scroll positions
    const viewportHeight = window.innerHeight;
    const fromScrollY = fromIndex * viewportHeight + 80; // 80px header
    const toScrollY = toIndex * viewportHeight + 80;
    
    const startTime = Date.now();
    const startScrollY = window.scrollY;
    const distance = toScrollY - startScrollY;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing (ease-in-out)
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        const currentScrollY = startScrollY + distance * easeProgress;
        window.scrollTo(0, currentScrollY);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
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
    console.log('Hash detected:', hash);
    
    if (hash === '#about') {
        displayAbout();
    } else if (hash === '#form') {
        displayForm();
    } else {
        displayHome();
    }
}

// Initialize as soon as DOM is ready
document.addEventListener('DOMContentLoaded', initializePageFromHash);

// Also handle hash changes when user clicks back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    console.log('Hash changed to:', hash);
    if (hash === '#home') displayHome();
    else if (hash === '#about') displayAbout();
    else if (hash === '#form') displayForm();
});

// Prevent horizontal scrolling on body
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
