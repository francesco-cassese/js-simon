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

/*
   Prende quello che l'utente ha scritto nelle caselle e lo pulisce
 */
const estraiNumeriUtente = () => {

    let numeriInseriti = [];                           // Contenitore per i numeri che l'utente crede di ricordare

    // Controllo tutte le caselle di input che abbiamo nel Main
    for (let i = 0; i < campiInput.length; i++) {

        // Trasformo il testo della casella in un vero numero
        let valore = parseInt(campiInput[i].value);

        // Salvo il valore solo se è un numero vero (scarto caselle vuote o lettere)
        if (!isNaN(valore)) {
            numeriInseriti.push(valore);
        }
    }

    return numeriInseriti;                             // Restituisco la lista dei numeri pulita e pronta al confronto
}

/*
   Verifica quanti numeri l'utente ha indovinato davvero
 */
const confrontaSequenze = () => {

    let numeriVincenti = [];                           // Qui salveremo i "trofei", ovvero i numeri indovinati

    // Prendo i numeri puliti chiamando la funzione precedente
    let datiUtente = estraiNumeriUtente();

    // Guardo uno per uno i numeri inseriti dall'utente
    for (let i = 0; i < datiUtente.length; i++) {

        let numeroCorrente = datiUtente[i];            // Prendo il numero che l'utente ha scritto in questa casella

        //Controllo se il numero è tra quelli giusti E se non l'ho già contato
        if (sequenzaCorretta.includes(numeroCorrente) && !numeriVincenti.includes(numeroCorrente)) {

            numeriVincenti.push(numeroCorrente);       // Segno il numero come "Indovinato"
        }
    }

    return numeriVincenti;                             // Restituisco la lista finale dei successi per dirlo all'utente
}