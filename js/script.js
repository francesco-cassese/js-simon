'use strict';

/* --- COLLEGAMENTI --- */
const containerCountdown = document.querySelector('#countdown'); // Recupero il contenitore HTML


/* --- VARIABILI --- */
const secondiIniziali = 5;                                      // Imposto il tempo di gioco per il Simon Says


/* --- MAIN --- */

// Chiamo la logica e gestisco gli avvisi in base ai codici 1 e 0

gestioneContoAllaRovescia(secondiIniziali, (codice, tempoRimanente) => {

    if (codice === 1) {
        // Gestione Avviso: Il timer è attivo
        containerCountdown.innerHTML = `Mancano: ${tempoRimanente}s`;
    } else if (codice === 0) {
        // Gestione Avviso: Il timer è arrivato a zero
        containerCountdown.innerHTML = "TEMPO SCADUTO!";
    }

});

