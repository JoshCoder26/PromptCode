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