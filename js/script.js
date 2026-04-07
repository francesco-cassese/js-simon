'use strict';

/* ================================================================================
    LOGICA PRINCIPALE (MAIN) - GESTIONE INTERFACCIA E FLUSSO DI GIOCO
================================================================================ */

/* --- COLLEGAMENTI --- */
const paginaDiBenvenuto = document.querySelector('#welcome-screen'); // Schermata con il tasto "Inizia"
const bottoneInizio = document.querySelector('#start-button');   // Il bottone che fa partire il gioco
const containerCountdown = document.querySelector('#countdown');      // Dove mostro il tempo che scorre
const numeriDaIndovinare = document.querySelector('#numbers-list');    // L'area dove appaiono i numeri segreti
const istruzioni = document.querySelector('#instructions');    // Il testo che guida l'utente
const formRisposte = document.querySelector('#answers-form');    // Il contenitore dei campi di input
const campiInput = document.querySelectorAll('#input-group input'); // Le 5 caselle da riempire
const areaMessaggio = document.querySelector('#message');        // Il paragrafo per il verdetto finale


/* --- VARIABILI DI CONFIGURAZIONE --- */
const secondiIniziali = 5;                                       // Quanto tempo ha l'utente per memorizzare
const quantitaNumeri = 5;                                       // Quanti numeri deve generare il software
let sequenzaCorretta = [];                                      // Dove salviamo i numeri da indovinare


/* --- GESTIONE DEL CLICK DI INIZIO --- */

bottoneInizio.addEventListener('click', () => {

    //CAMBIO SCHERMATA: Nascondo il benvenuto e mostro le istruzioni
    paginaDiBenvenuto.classList.add('d-none');
    istruzioni.classList.remove('d-none');

    //GENERAZIONE DATI: Chiedo alle funzioni di creare 5 numeri e li salvo nella variabile globale
    sequenzaCorretta = generaSequenzaNumerica(quantitaNumeri);
    numeriDaIndovinare.innerHTML = `${sequenzaCorretta.join(' - ')}`; // Mostro i numeri a schermo separati da un trattino

    // PARTENZA TIMER: Avvio il conto alla rovescia passando il tempo e una funzione per gestire i due stati
    gestioneContoAllaRovescia(secondiIniziali, (codice, tempoRimanente) => {

        if (codice === 1) {
            // STATO ATTIVO: Mentre il tempo scorre, aggiorno il testo del countdown
            containerCountdown.innerHTML = `Mancano: ${tempoRimanente}s`;
        } else {
            // STATO SCADUTO: Il tempo è finito, nascondo i numeri e chiedo le risposte
            containerCountdown.innerHTML = "INSERISCI I NUMERI!";

            // PULIZIA SCHERMATA: Nascondo i numeri e le istruzioni (non deve più sbirciare!)
            numeriDaIndovinare.classList.add('d-none');
            istruzioni.classList.add('d-none');

            // FASE DI INPUT: Faccio apparire il form con le caselle da riempire
            formRisposte.classList.remove('d-none');

            // Lascio un promemoria in console
            console.log("Sequenza corretta da indovinare:", sequenzaCorretta);
        }
    });
});


/* --- GESTIONE DELLA VERIFICA FINALE (TASTO CONFERMA) --- */

formRisposte.addEventListener('submit', (event) => {
    // BLOCCO IL REFRESH: Evito che la pagina si ricarichi (comportamento standard dei form)
    event.preventDefault();

    // CALCOLO RISULTATI: Chiedo alla funzione di confrontare i numeri inseriti con quelli segreti
    const indovinati = confrontaSequenze();

    // COMUNICAZIONE ESITO: Decido che messaggio mostrare in base a quanti numeri sono stati trovati
    if (indovinati.length > 0) {
        // CASO VITTORIA (Almeno uno indovinato): Coloro il testo di verde e mostro i numeri presi
        areaMessaggio.className = "text-success fw-bold mt-3 text-center";
        areaMessaggio.innerHTML = `Ottimo! Hai indovinato ${indovinati.length} numeri: ${indovinati.join(' - ')}`;
    } else {
        // CASO SCONFITTA (Zero indovinati): Coloro il testo di rosso per segnalare l'errore
        areaMessaggio.className = "text-danger fw-bold mt-3 text-center";
        areaMessaggio.innerHTML = "Non hai indovinato nessun numero! Ritenta la prossima volta.";
    }
});