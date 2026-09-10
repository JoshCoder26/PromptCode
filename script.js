let currentTabIndex = 0;
const tabMap = {
    'home': 0,
    'about': 1,
    'form': 2
};

function changeTab(targetId, newTitle) {
    document.title = newTitle;
    
    // Get the tab index
    const targetTabId = targetId.substring(1); // Remove #
    const targetIndex = tabMap[targetTabId];
    
    if (targetIndex === undefined) return;
    
    // Animate the scroll
    animateHorizontalScroll(currentTabIndex, targetIndex);
    
    // Update sections
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update current index
    currentTabIndex = targetIndex;
}

function animateHorizontalScroll(fromIndex, toIndex) {
    const duration = 1000; // 1 second
    const distance = Math.abs(toIndex - fromIndex); // Number of sections to scroll
    
    // Calculate pixels to scroll (each section is viewport width)
    const pixelsPerSection = window.innerWidth;
    const totalPixels = distance * pixelsPerSection;
    const direction = toIndex > fromIndex ? 1 : -1;
    
    const startTime = Date.now();
    const startScrollX = window.scrollX;
    const targetScrollX = startScrollX + (totalPixels * direction);
    
    console.log('Animating from index', fromIndex, 'to', toIndex);
    console.log('Scrolling from', startScrollX, 'to', targetScrollX);
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing (ease-in-out)
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        
        const scrollDifference = targetScrollX - startScrollX;
        const currentScrollX = startScrollX + scrollDifference * easeProgress;
        
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
    const hash = window.location.hash.substring(1); // Remove #
    console.log('Hash detected:', hash);
    
    if (hash === 'about') {
        displayAbout();
    } else if (hash === 'form') {
        displayForm();
    } else {
        displayHome();
    }
}

// Initialize as soon as DOM is ready
document.addEventListener('DOMContentLoaded', initializePageFromHash);

// Also handle hash changes when user clicks back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    console.log('Hash changed to:', hash);
    if (hash === 'home') displayHome();
    else if (hash === 'about') displayAbout();
    else if (hash === 'form') displayForm();
});

// Prevent horizontal scrolling on body (users can only use nav buttons)
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
