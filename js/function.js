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
