// script.js
console.log("Die JS-Datei wurde erfolgreich geladen!");

function begruessung() {
    alert("Hallo aus der externen Datei!");
}

// Ändere die Farbe der Überschrift, sobald die Datei geladen ist
document.addEventListener("DOMContentLoaded", () => {
    const h1 = document.querySelector('h1');
    if (h1) h1.style.color = 'orange';
});