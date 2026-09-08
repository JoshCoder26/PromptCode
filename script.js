// FUNCTIONALITEIT VOOR DE TABS
function openTab(tabId) {
    // 1. Verberg alle tab-inhoud
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));

    // 2. Maak alle knoppen inactief
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Toon de geselecteerde tab en zet de geklikte knop op actief
    document.getElementById(tabId).classList.add('active-content');
    event.currentTarget.classList.add('active');
}

// FORMSUBMIT LOGICA VIA FETCH
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const submitButton = this.querySelector('.submit-btn');
    
    // Verander knoptekst tijdens het laden
    submitButton.innerText = "Sending Request...";
    submitButton.disabled = true;

    fetch("https://formsubmit.co/joshua.huizer@gmail.com", { // Vul hier je echte mail in!
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        alert("Success! Your prompt request has been received by PromptCode.");
        this.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    })
    .finally(() => {
        // Herstel de knop
        submitButton.innerText = "Submit Request";
        submitButton.disabled = false;
    });
});
