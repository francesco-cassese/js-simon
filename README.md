# JS Simon Says 🧠

## 📌 Descrizione
Un gioco di memoria ispirato al celebre "Simon Says". Il software genera una sequenza di numeri casuali che l'utente deve memorizzare prima che scompaiano, per poi testare la propria capacità di rievocazione attraverso un form di inserimento.

## 🎯 Obiettivo
Gestire il flusso temporale di un'applicazione web, coordinando la visualizzazione dei dati, il countdown di memoria e la fase di verifica dei risultati.

### Focus Tecnico:
- **Asincronia (Timers):** Utilizzo di `setTimeout` per gestire la scomparsa dei numeri dopo 30 secondi e la comparsa del form di input.
- **Data Management:** Utilizzo di array per memorizzare i numeri generati casualmente e i numeri inseriti dall'utente per il confronto finale.
- **Manipolazione DOM:** Gestione della visibilità degli elementi (mostrare/nascondere sezioni) e generazione dinamica di contenuti.
- **Logica di Confronto:** Algoritmo per identificare quali e quanti numeri corrispondono tra le due liste, indipendentemente dall'ordine di inserimento.
- **Validazione (Bonus):** Controllo degli input per impedire l'inserimento di duplicati o caratteri non numerici, con feedback visivo immediato.

## 🛠️ Tecnologie Utilizzate
- **HTML5:** Struttura per la visualizzazione dei numeri e del form.
- **CSS3:** Gestione degli stati visivi (classi `.d-none` o simili) e feedback di validazione.
- **JavaScript (ES6+):** Logica di gioco, gestione del tempo e manipolazione degli array.

---

## 🧪 Flusso di Gioco
1. **Fase di Mostra:** Appaiono 5 numeri casuali a schermo.
2. **Fase di Attesa:** Parte un timer di 30 secondi (tempo di memorizzazione).
3. **Fase di Input:** I numeri scompaiono e l'utente inserisce i 5 valori che ricorda.
4. **Fase di Risultato:** Il software confronta le liste e comunica il punteggio totale e i numeri indovinati.

---
QUANTO È BUONA LA TUA MEMORIA? 🧩

*Esercizio Boolean - Corso Full Stack Web Development*