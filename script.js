if (window.location.hash === "#sent"){
    document.title = "Thank you"
    document.querySelector('#sent').classList.add('active')
}

document.title = "Home - PromptCode"
document.querySelector('#home').classList.add('active')
function changeTab(targetId, newTitle) {
    document.title = newTitle;
    const targetSection = document.querySelector(targetId);
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

function checkCompany() {
    if (document.getElementById("fakeIsCompany") === ""){
        document.getElementById("isCompany").checked = false
    }
    else {
        document.getElementById("isCompany").checked = true
    }
}