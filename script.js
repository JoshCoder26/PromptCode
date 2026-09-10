function changeTab(targetId, newTitle) {
    // 1. Verander de titel van het tabblad
    document.title = newTitle;

    // 2. Zoek de juiste sectie op
    const targetSection = document.querySelector(targetId);
    
    // 3. Laat de browser er vloeiend naartoe scrollen
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function displayHome() {
    changeTab('#home', "Home - PromptCode");
}

function displayAbout() {
    changeTab('#about', "About - PromptCode");
}

function displayForm() {
    changeTab('#form', "Request code writing/enhancing/debugging");
}
