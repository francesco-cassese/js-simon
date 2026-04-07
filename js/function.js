'use strict';

/* ================================================================================
     FUNZIONI - SIMON SAYS
================================================================================ */

/**
 * Gestisce il tempo che scorre e avvisa il Main ogni secondo
 */
const gestioneContoAllaRovescia = (secondi, comunicaStato) => {

    let tempoCorrente = secondi;                       // Variabile di appoggio per non "rompere" il valore originale
    let timerAttivo = true;                            // Interruttore per dire al ciclo se può continuare a girare

    comunicaStato(1, tempoCorrente);                   // Dico subito al Main di stampare il numero di partenza

    let identificatoreTimer = setInterval(function () {

        // Controllo se c'è ancora tempo e se l'interruttore è su ON
        if (tempoCorrente > 0 && timerAttivo) {
            tempoCorrente--;                           // Tolgo un secondo alla volta
            return comunicaStato(1, tempoCorrente);    // Restituisco "1" (ATTIVO) e il tempo che resta
        } else {
            clearInterval(identificatoreTimer);        // Stoppo il timer
            timerAttivo = false;                       // Metto l'interruttore su OFF 
            return comunicaStato(0);                   // Restituisco "0" (FINITO) per far apparire gli input
        }

    }, 1000);                                          // Dico al computer di ripetere tutto ogni 1000ms (1 secondo)
}

/*
  Crea la lista di 5 numeri segreti senza mai far uscire doppioni
*/
const generaSequenzaNumerica = (quantita) => {

    let numeriUnici = [];                              // Il contenitore dove metteremo i numeri "buoni"
    let numeriTrovati = 0;                             // Contatore che mi dice a che punto siamo con la generazione

    // Ciclo finché il contenitore non è pieno
    while (numeriTrovati < quantita) {

        let numeroCasuale = Math.floor(Math.random() * 50) + 1; // Genero un numero tra 1 e 50

        // Controllo se il numero appena uscito è già nel contenitore
        if (!numeriUnici.includes(numeroCasuale)) {
            numeriUnici.push(numeroCasuale);           // Lo aggiungo solo se è un numero "nuovo"
            numeriTrovati++;                           // Segno che ho trovato un numero valido in più
        }
    }

    return numeriUnici;                                // Consegno l'array completo con tutti numeri diversi
}

// --- FUNZIONE RECUPERO DATI INPUT --- 

const estraiNumeriUtente = () => {
    let numeriInseriti = [];

    for (let i = 0; i < campiInput.length; i++) {
        let valore = parseInt(campiInput[i].value);

        // Se l'utente lascia una casella vuota o scrive lettere
        if (isNaN(valore)) {
            return -1;
        }

        // Se l'utente scrive numeri assurdi (es. negativi o oltre 50)
        if (valore < 1 || valore > 50) {
            return -2;
        }

        numeriInseriti.push(valore);
    }

    return numeriInseriti;
}

// --- FUNZIONE LOGICA DI CONFRONTO --- 

const confrontaSequenze = () => {
    let numeriVincenti = [];
    let datiUtente = estraiNumeriUtente();

    // Se estraiNumeriUtente ha restituito un codice di errore, lo passo al Main
    if (datiUtente === -1 || datiUtente === -2) {
        return datiUtente;
    }

    for (let i = 0; i < datiUtente.length; i++) {
        let numeroCorrente = datiUtente[i];

        // Controllo se il numero è giusto e non duplicato
        if (sequenzaCorretta.includes(numeroCorrente) && !numeriVincenti.includes(numeroCorrente)) {
            numeriVincenti.push(numeroCorrente);
        }
    }

    return numeriVincenti;
}