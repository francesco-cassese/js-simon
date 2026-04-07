'use strict';

/* ================================================================================
    LIBRERIA DELLE FUNZIONI - LOGICA DI GIOCO SIMON SAYS
================================================================================ */

// --- FUNZIONE CONTO ALLA ROVESCIA --- 

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
            clearInterval(identificatoreTimer);        // Stoppo il timer per non consumare memoria inutilmente
            timerAttivo = false;                       // Metto l'interruttore su OFF per chiudere il flusso
            return comunicaStato(0);                   // Restituisco "0" (FINITO) per far apparire gli input nel Main
        }

    }, 1000);                                          // Dico al computer di ripetere tutto ogni 1000ms (1 secondo)
}

// --- FUNZIONE NUMERI RANDOM --- 

const generaSequenzaNumerica = (quantita) => {

    let numeriUnici = [];                              // Il contenitore dove metteremo i numeri "buoni"
    let numeriTrovati = 0;                             // Contatore che mi dice a che punto siamo con la generazione

    // Ciclo finché il contenitore non è pieno del numero di cifre richiesto
    while (numeriTrovati < quantita) {

        let numeroCasuale = Math.floor(Math.random() * 50) + 1; // Genero un numero casuale tra 1 e 50

        // Controllo se il numero appena uscito è già nel contenitore per evitare doppioni
        if (!numeriUnici.includes(numeroCasuale)) {
            numeriUnici.push(numeroCasuale);           // Lo aggiungo alla lista solo se è un numero "nuovo"
            numeriTrovati++;                           // Incremento il totale dei numeri validi trovati
        }
    }

    return numeriUnici;                                // Consegno l'array completo con tutti numeri diversi
}

// --- FUNZIONE VALIDAZIONE NUMERO --- 

const validaSingoloNumero = (valore, listaEsistente) => {

    // 1. Controllo se è un numero vero (non testo o vuoto)
    if (isNaN(valore)) {
        return -1;                                     // Restituisco -1 se la casella è vuota o contiene lettere
    }

    // 2. Controllo se rispetta i confini del gioco (1-50)
    if (valore < 1 || valore > 50) {
        return -2;                                     // Restituisco -2 se il numero è troppo grande o piccolo
    }

    // 3. Controllo se il numero è già stato inserito in una delle caselle precedenti
    if (listaEsistente.includes(valore)) {
        return -3;                                     // Restituisco -3 se l'utente ha scritto un doppione
    }

    return 1;                                          // Restituisco 1 se il numero ha superato tutti i controlli
}

// --- FUNZIONE GESTIONE VISIVA ERRORI ---

const evidenziaCampiErrati = (codiceErrore, listaInput) => {

    let memoriaLocale = []; // Serve per permettere alla validazione di trovare i doppioni

    listaInput.forEach(input => {
        let valore = parseInt(input.value);

        // Chiedo alla validazione se questo campo specifico ha l'errore che stiamo cercando
        let esito = validaSingoloNumero(valore, memoriaLocale);

        // Se l'errore del campo è lo stesso che ha bloccato il gioco, coloro di rosso
        if (esito === codiceErrore) {
            input.classList.add('is-invalid');
        }

        // Nutro la memoria per il prossimo giro del ciclo
        memoriaLocale.push(valore);
    });
}

// --- FUNZIONE RECUPERO DATI INPUT --- 

const estraiNumeriUtente = () => {

    let numeriInseriti = [];                           // Contenitore per i numeri che il giocatore ha digitato

    // Controllo tutte le caselle di input collegate globalmente nel Main
    for (let i = 0; i < campiInput.length; i++) {

        // Trasformo il testo scritto dall'utente in un numero intero
        let valore = parseInt(campiInput[i].value);

        // Chiedo allo "sceriffo" di controllare il valore e se è un doppione rispetto a quelli già salvati
        let statoValidazione = validaSingoloNumero(valore, numeriInseriti);

        // Se lo sceriffo trova un errore (-1, -2 o -3), interrompo tutto e passo il codice al Main
        if (statoValidazione < 0) {
            return statoValidazione;
        }

        // Se il numero è perfetto, lo aggiungo alla lista temporanea per i prossimi controlli
        numeriInseriti.push(valore);
    }

    return numeriInseriti;                             // Restituisco la lista dei numeri pulita e pronta al confronto
}

// --- FUNZIONE LOGICA DI CONFRONTO --- 

const confrontaSequenze = () => {

    let numeriVincenti = [];                           // Qui salveremo i numeri indovinati

    // Richiamo la funzione di estrazione per ottenere i dati utente o i codici errore
    let datiUtente = estraiNumeriUtente();

    // Se datiUtente è un numero negativo, significa che c'è un errore (-1, -2 o -3)
    if (datiUtente < 0) {
        return datiUtente;                             // Passo il codice dell'errore al Main
    }

    // Se arrivo qui, datiUtente è per forza la lista dei numeri inseriti
    for (let i = 0; i < datiUtente.length; i++) {

        let numeroCorrente = datiUtente[i];            // Numero scritto dall'utente in questa casella

        // Guardo se il numero è presente nella sequenza segreta
        if (sequenzaCorretta.includes(numeroCorrente)) {

            numeriVincenti.push(numeroCorrente);       // Segno il punto!
        }
    }

    return numeriVincenti;                             // Restituisco la lista dei successi
}