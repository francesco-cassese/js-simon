'use strict';

/* --- FUNZIONE CONTO ALLA ROVESCIA --- */
const gestioneContoAllaRovescia = (secondi, comunicaStato) => {

    let tempoCorrente = secondi;                           // Variabile di lavoro per il calcolo
    let timerAttivo = true;                                // Flag per il controllo del flusso

    comunicaStato(1, tempoCorrente);                       // Qui gli faccio stampare il numero da dovbe inizia il timer

    let identificatoreTimer = setInterval(function () {

        if (tempoCorrente > 0 && timerAttivo) {
            tempoCorrente--;                               // Decremento il valore
            return comunicaStato(1, tempoCorrente);        // CODICE 1: Il timer è attivo (invio anche il dato)
        } else {
            clearInterval(identificatoreTimer);            // Interrompo l'intervallo
            timerAttivo = false;                           // Cambio lo stato della flag per uscire
            return comunicaStato(0);                       // CODICE 0: Il tempo è scaduto
        }

    }, 1000);                                              // Frequenza di un secondo


}

/* --- FUNZIONE NUMERI RANDOM --- */

const generaSequenzaNumerica = (quantita) => {

    let numeriUnici = [];                                  // Array per i numeri finali
    let numeriTrovati = 0;                                 // Variabile di stato per il controllo del ciclo

    // Ciclo finché non abbiamo raggiunto la quantità desiderata
    while (numeriTrovati < quantita) {

        let numeroCasuale = Math.floor(Math.random() * 50) + 1;

        // controllo se il numero è già presente nell'array
        if (!numeriUnici.includes(numeroCasuale)) {
            numeriUnici.push(numeroCasuale);               // Lo aggiungo solo se è nuovo
            numeriTrovati++;                               // Incremento lo stato solo in caso di successo
        }
    }

    return numeriUnici;                                    // Ritorno l'array di numeri tutti diversi
}

/* --- FUNZIONE RECUPERO DATI INPUT --- */

const estraiNumeriUtente = () => {

    let numeriInseriti = [];                               // Array per memorizzare i valori estratti dagli input

    // 1. Ciclo i campiInput (globali) per prelevare i dati
    for (let i = 0; i < campiInput.length; i++) {

        // Trasformo il valore testuale in numero intero
        let valore = parseInt(campiInput[i].value);

        // Pusho nell'array solo se il dato è un numero valido
        if (!isNaN(valore)) {
            numeriInseriti.push(valore);
        }
    }

    return numeriInseriti;                                 // Ritorno l'array pulito al chiamante
}


/* --- FUNZIONE LOGICA DI CONFRONTO --- */

const confrontaSequenze = () => {

    let numeriVincenti = [];                               // Array per i numeri indovinati correttamente

    // Richiamo la funzione di estrazione per avere i dati pronti
    let datiUtente = estraiNumeriUtente();

    // Confronto con la sequenza globale (senza considerare l'ordine)
    for (let i = 0; i < datiUtente.length; i++) {

        let numeroCorrente = datiUtente[i];                // Variabile di appoggio per il numero da controllare

        // Controllo se presente nell'originale E Aggiungi questo numero all'elenco dei punti fatti SOLO SE non l'hai già inserito prima.
        if (sequenzaCorretta.includes(numeroCorrente) && !numeriVincenti.includes(numeroCorrente)) {

            numeriVincenti.push(numeroCorrente);           // Inserisco il numero nei risultati positivi
        }
    }

    return numeriVincenti;                                 // Ritorno l'array dei successi per la stampa nel Main
}