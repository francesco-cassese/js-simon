'use strict';

/* ================================================================================
    LOGICA PRINCIPALE (MAIN) - GESTIONE INTERFACCIA E FLUSSO DI GIOCO
================================================================================ */

/* --- COLLEGAMENTI --- */
const paginaDiBenvenuto = document.querySelector('#welcome-screen'); // Schermata con il tasto "Inizia"
const bottoneInizio = document.querySelector('#start-button');       // Il bottone che fa partire il gioco
const containerCountdown = document.querySelector('#countdown');     // Dove mostro il tempo che scorre
const numeriDaIndovinare = document.querySelector('#numbers-list');  // L'area dove appaiono i numeri segreti
const istruzioni = document.querySelector('#instructions');          // Il testo che guida l'utente
const formRisposte = document.querySelector('#answers-form');        // Il contenitore dei campi di input
const campiInput = document.querySelectorAll('#input-group input');  // Le 5 caselle da riempire
const areaMessaggio = document.querySelector('#message');            // Il paragrafo per il verdetto finale
const bottoneRiprova = document.querySelector('#btn-restart')        // Bottone restart
const bottoneConferma = document.querySelector('.btn-confirm');      // Bottone conferma


/* --- VARIABILI DI CONFIGURAZIONE --- */
const secondiIniziali = 10;                                      // Quanto tempo ha l'utente per memorizzare
const quantitaNumeri = 5;                                       // Quanti numeri deve generare il software
let sequenzaCorretta = [];                                      // Dove salviamo i numeri da indovinare


/* --- GESTIONE DEL CLICK DI INIZIO --- */

bottoneInizio.addEventListener('click', () => {

    // Validazione numero 
    const risultatoGenerazione = generaSequenzaNumerica(quantitaNumeri);

    // Se la funzione restituisce -1, fermo tutto prima del timer
    if (risultatoGenerazione === -1) {
        alert(` ERRORE: Impossibile generare ${quantitaNumeri} numeri unici nel range 1-50.`);
        console.error("quantitaNumeri troppo alta.");
        return; // Esco dalla funzione e il gioco non parte
    }

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
            containerCountdown.innerHTML = `<i class="fa-solid fa-hourglass-half fa-spin-pulse me-2"></i> Mancano: ${tempoRimanente}s`;
        } else {
            // STATO SCADUTO: Il tempo è finito, nascondo i numeri e chiedo le risposte
            containerCountdown.innerHTML = `<i class="fa-solid fa-keyboard me-2"></i> INSERISCI I NUMERI!`;

            // PULIZIA SCHERMATA: Nascondo i numeri e le istruzioni (non deve più sbirciare!)
            numeriDaIndovinare.classList.add('d-none');
            istruzioni.classList.add('d-none');

            // FASE DI INPUT: Faccio apparire il form con le caselle da riempire
            formRisposte.classList.remove('d-none');

            // Lascio un promemoria in console
            console.log("Sequenza corretta da indovinare:", sequenzaCorretta);
        }

        return true;
    });
});


/* --- GESTIONE DELLA VERIFICA FINALE (TASTO CONFERMA) --- */

formRisposte.addEventListener('submit', (event) => {

    // BLOCO IL REFRESH
    event.preventDefault();

    // Reset stati grafici
    campiInput.forEach(input => input.classList.remove('is-invalid'));
    areaMessaggio.innerHTML = "";

    // Calcolo risultati
    const indovinati = confrontaSequenze();

    // 1. GESTIONE ERRORI DI VALIDAZIONE
    if (indovinati < 0) {
        areaMessaggio.className = "text-warning fw-bold mt-3";

        if (indovinati === -1) {
            areaMessaggio.innerHTML = `<i class="fa-solid fa-pen-clip me-2"></i> Caselle vuote! Riempile tutte.`;
        } else if (indovinati === -2) {
            areaMessaggio.innerHTML = `<i class="fa-solid fa-circle-exclamation me-2"></i> Numeri fuori range (1-50)!`;
        } else if (indovinati === -3) {
            areaMessaggio.innerHTML = `<i class="fa-solid fa-clone me-2"></i> Doppioni! Ogni numero deve essere unico.`;
        }

        evidenziaCampiErrati(indovinati, campiInput);
        return; // Esce solo se c'è un errore
    }

    // 2. SE TUTTO È OK: DISABILITO BOTTONE E MOSTRO ESITO
    bottoneConferma.disabled = true;

    if (indovinati.length > 0) {
        // CASO VITTORIA
        areaMessaggio.className = "text-success fw-bold mt-3 text-center";
        areaMessaggio.innerHTML = `<i class="fa-solid fa-trophy fa-bounce me-2"></i> BOOM! Hai indovinato ${indovinati.length} numero/i: [ ${indovinati.join(' - ')} ]`;

        if (indovinati.length === quantitaNumeri) {
            alert("🤯 PAZZESCO! Li hai presi tutti! Sei un fenomeno!");
        }
    } else {
        // CASO SCONFITTA
        areaMessaggio.className = "text-danger fw-bold mt-3 text-center";
        areaMessaggio.innerHTML = `<i class="fa-solid fa-ghost me-2"></i> Zero spaccato! La tua memoria è come un colino...`;
    }

    // Mostro il tasto per ricominciare
    bottoneRiprova.classList.remove('d-none');

});

/* --- CONFIGURAZIONE RESET --- */

// Creo una funzione che genera una funzione di reset con i miei parametri
const resetPersonalizzato = creaResetGioco(
    campiInput,
    areaMessaggio,
    containerCountdown,
    numeriDaIndovinare,
    formRisposte,
    paginaDiBenvenuto,
    bottoneRiprova,
    bottoneConferma
);

/* --- LOGICA DI RESTART --- */

// Lo collego al addEventListener del bottone
bottoneRiprova.addEventListener('click', resetPersonalizzato);