const foxImage = document.getElementById('fox-image');
const placeholderText = document.getElementById('placeholder-text');
const loadButton = document.getElementById('load-fox');
const historyTableBody = document.getElementById('fox-history');

let foxCounter = 0;

async function fetchFox() {
    try {
        loadButton.textContent = "Se caută...";
        loadButton.disabled = true;

        const response = await fetch('https://randomfox.ca/floof/');
        if (!response.ok) throw new Error("API Indisponibil");

        const data = await response.json();
        
        // Actualizăm poza principală
        foxImage.src = data.image;
        foxImage.style.display = "block";
        placeholderText.style.display = "none";

        // Adăugăm în tabel
        foxCounter++;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${foxCounter}</td>
            <td><img src="${data.image}" class="history-thumb"></td>
            <td><a href="${data.image}" target="_blank" style="color:#a44a3f; font-weight:bold;">Vezi sursa</a></td>
        `;
        historyTableBody.prepend(row);

    } catch (error) {
        alert("Eroare: Nu am putut găsi vulpea!");
    } finally {
        loadButton.textContent = "Încarcă poza noua";
        loadButton.disabled = false;
    }
}

// Punem evenimentul pe buton
loadButton.addEventListener('click', fetchFox);

// Încărcăm o vulpe direct când se deschide pagina
window.onload = fetchFox;