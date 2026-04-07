'use strict';

/* --- COLLEGAMENTI --- */
const paginaDiBenvenuto = document.querySelector('#welcome-screen');
const bottoneInizio = document.querySelector('#start-button');
const containerCountdown = document.querySelector('#countdown');
const numeriDaIndovinare = document.querySelector('#numbers-list');
const istruzioni = document.querySelector('#instructions');
const formRisposte = document.querySelector('#answers-form');
const campiInput = document.querySelectorAll('#input-group input');
const areaMessaggio = document.querySelector('#message');


/* --- VARIABILI --- */
const secondiIniziali = 5;                                      // Imposto il tempo di gioco per il Simon Says
const quantitaNumeri = 5;                                       // Inposto i numeri che mi servono 
let sequenzaCorretta = [];                                      // Memorizzo i numeri generati per il confronto finale


/* --- MAIN --- */

bottoneInizio.addEventListener('click', () => {

    //Fase di Sparizione/Apparizione
    paginaDiBenvenuto.classList.add('d-none');
    istruzioni.classList.remove('d-none');

    //Richiamo gli strumenti
    sequenzaCorretta = generaSequenzaNumerica(quantitaNumeri);
    numeriDaIndovinare.innerHTML = `${sequenzaCorretta.join(' - ')}`;

    //Esecuzione Timer
    gestioneContoAllaRovescia(secondiIniziali, (codice, tempoRimanente) => {

        if (codice === 1) {
            //Durante il countdown
            containerCountdown.innerHTML = `Mancano: ${tempoRimanente}s`;
        } else {
            //A tempo scaduto
            containerCountdown.innerHTML = "INSERISCI I NUMERI!";

            //Nascondo elementi di memorizzazione
            numeriDaIndovinare.classList.add('d-none');
            istruzioni.classList.add('d-none');

            //Mostro il form di risposta
            formRisposte.classList.remove('d-none');

            console.log("Sequenza corretta:", sequenzaCorretta);
        }
    });
});

// 2. Verifica Risultati
formRisposte.addEventListener('submit', (event) => {
    event.preventDefault();

    // Chiamo la funzione che mi confronta i numeri generati e i numeri del giocatore
    const indovinati = confrontaSequenze();

    // Gestione Messaggi nel Main
    if (indovinati.length > 0) {
        areaMessaggio.className = "text-success fw-bold mt-3";
        areaMessaggio.innerHTML = `Hai indovinato ${indovinati.length} numeri: ${indovinati.join(' - ')}`;
    } else {
        areaMessaggio.className = "text-danger fw-bold mt-3";
        areaMessaggio.innerHTML = "Non hai indovinato nessun numero!";
    }
});