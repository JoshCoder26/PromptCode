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
        const navRect = nav.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        const offset = linkRect.left - navRect.left;
        
        // Animate the scroll
        nav.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${offset}px)` }
        ], {
            duration: 400,
            easing: 'ease-in-out'
        });
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
