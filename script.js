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
    
    // Remove active class from all sections and add to target
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    targetSection.classList.add('active');
    
    // Animate the horizontal scroll
    animateHorizontalScroll(currentIndex, targetIndex, 1000); // 1 second
}

function animateHorizontalScroll(fromIndex, toIndex, duration) {
    const sectionWidth = window.innerWidth;
    
    // Calculate scroll positions
    const fromScrollX = fromIndex * sectionWidth;
    const toScrollX = toIndex * sectionWidth;
    
    const startTime = Date.now();
    const startScrollX = window.scrollX;
    const distance = toScrollX - startScrollX;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing (ease-in-out)
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        const currentScrollX = startScrollX + distance * easeProgress;
        window.scrollTo(currentScrollX, 0);
        
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

// Prevent horizontal scrolling on body (except during animations)
let isAnimating = false;

document.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !isAnimating) {
        e.preventDefault();
    }
}, { passive: false });

// Also prevent touchmove horizontal scroll
let lastX = 0;
document.addEventListener('touchstart', function(e) {
    lastX = e.touches[0].clientX;
}, false);

document.addEventListener('touchmove', function(e) {
    if (isAnimating) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = Math.abs(currentX - lastX);
    const diffY = Math.abs(e.touches[0].clientY - (e.touches[0].clientY || 0));
    
    if (diffX > diffY) {
        e.preventDefault();
    }
    lastX = currentX;
}, { passive: false });
