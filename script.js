alert("JavaScript laadt succesvol!");
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#home') {
            document.title = "Home - PromptCode";
        } else if (targetId === '#about') {
            document.title = "About - PromptCode";
        } else if (targetId === '#form') {
            document.title = "Request code writing/enhancing/debugging";
        }
    })});
