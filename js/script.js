'use strict';

/* --- COLLEGAMENTI --- */
const containerCountdown = document.querySelector('#countdown'); // Recupero il contenitore HTML
const numeriDaIndovinare = document.querySelector('#numbers-list'); //Recupero il contenitore della lista numeri


/* --- VARIABILI --- */
const secondiIniziali = 5;                                      // Imposto il tempo di gioco per il Simon Says
const quantitaNumeri = 5;                                       // Inposto i numeri che mi servono 


/* --- MAIN --- */

const sequenza = generaSequenzaNumerica(quantitaNumeri);        //Richiamo la funzione che mi genera i numeri 

numeriDaIndovinare.innerHTML = `${sequenza.join(' - ')}`;       //Stampo i 5 numeri nell'html

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

