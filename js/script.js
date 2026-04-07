'use strict';

/* --- COLLEGAMENTI --- */
const paginaDiBenvenuto = document.querySelector('#welcome-screen');
const bottoneInizio = document.querySelector('#start-button');
const containerCountdown = document.querySelector('#countdown');
const numeriDaIndovinare = document.querySelector('#numbers-list');
const istruzioni = document.querySelector('#instructions');
const formRisposte = document.querySelector('#answers-form');
const campiInput = document.querySelectorAll('#input-group input');


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
    const sequenzaCorretta = generaSequenzaNumerica(quantitaNumeri);
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