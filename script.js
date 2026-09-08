// FUNCTIONALITEIT VOOR DE TABS (GEFIXT)
function openTab(evt, tabId) {
    // 1. Verberg alle tab-inhoud
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));

    // 2. Maak alle knoppen inactief
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 3. Toon de geselecteerde tab en zet de geklikte knop op actief
    document.getElementById(tabId).classList.add('active-content');
    evt.currentTarget.classList.add('active');
}

// FORMSUBMIT LOGICA VIA FETCH
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const submitButton = this.querySelector('.submit-btn');
    
    submitButton.innerText = "Sending Request...";
    submitButton.disabled = true;

    fetch("https://formsubmit.co", { // Vul hier je echte mail in!
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        alert("Success! Your request has been received.");
        this.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    })
    .finally(() => {
        submitButton.innerText = "Submit Request";
        submitButton.disabled = false;
    });
});
