// I web storage sono stati introdotti con HTML5, nati per risolvere alcune limitazioni presenti con i vecchi sistemi di storage: es. cookies:
// 1) i cookie permettono di salvare un massimo di 4kb
// mentre le nuove API WebStorage permettono circa 5mb (per dominio)
// 2) i cookie non erano pensati per differenziare i dati nelle diverse sessioni

// Problemi risolti con le API di WebStorage, esistono due tipologie di memoria:
// 1) localStorage --> permanenza dei dati finché l'utente non li cancella
// 2) sessionStorage --> permanenza dei dati finché il tab o la finestra rimane aperta

// utilizzano entrambi gli stessi metodi:
// .setItem() --> salva un elemento con chiave/valore
// .getItem() --> cerca un elemento già salvato con un singolo valore (la chiave)

// .removeItem() --> rimuove una singola chiave e conseguente valore
// .clear() --> spazza via tutti i dati da quel specifico storage

// localStorage.clear(); <-- non scommentare a meno di non voler cancellare tutto.

let themeInStorage; // <-- contenitore globale per il futuro valore che troveremo nello storage

window.addEventListener("DOMContentLoaded", () => {
  checkStorageForTheme();

  const btnSet = document.getElementById("setDark");
  btnSet.onclick = setDarkTheme;
  const btnRem = document.getElementById("remDark");
  btnRem.onclick = removeDarkTheme;
});

window.onload = () => {
  const objRetrievedAsString = localStorage.getItem("my-object");
  const parsedObj = JSON.parse(objRetrievedAsString);
  console.log(parsedObj.name);

  checkForPreviousAlbumSelection();

  console.log("DISCOGRAPHY", discography);

  const container = document.getElementById("content");
  discography.forEach((obj) => {
    const card = document.createElement("div");
    card.className = "card";

    card.onclick = () => {
      const albumObj = { title: obj.title, artist: obj.artist };
      localStorage.setItem("album", JSON.stringify(albumObj));
    };

    card.innerHTML = `
                        <h3>${obj.title}</h3>
                        <span>${obj.artist}</span>
                        <span>${obj.year}</span>
                    `;

    container.appendChild(card);
  });
};

const checkStorageForTheme = () => {
  // controllerò sia al caricamento della pagina, sia dopo aver cliccato il bottone, la presenza del valore associato a "theme",
  themeInStorage = localStorage.getItem("theme");
  // se presente entreremo nel blocco dell'if e applicheremo la classe all'elemento HTML
  if (themeInStorage) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// funzione associata alla referenza del nodo del bottone, che all'onclick la chiamerà
const setDarkTheme = function (event) {
  //   console.log(this);
  //   console.log(event.target);
  //   console.log(event);
  const myObj = { name: "Stefano", surname: "Miceli" };

  localStorage.setItem("my-object", JSON.stringify(myObj));
  localStorage.setItem("new-arr", JSON.stringify([123, 12389, 12839]));
  checkStorageForTheme();
};

const removeDarkTheme = function () {
  // rimuoviamo l'elemento dallo storage
  localStorage.removeItem("theme");
  // e aggiorniamo lo stato della pagina per riflettere la nuova condizione dello storage
  checkStorageForTheme();
};

const checkForPreviousAlbumSelection = () => {
  const lastAlbumSelectedAsString = localStorage.getItem("album");
  if (lastAlbumSelectedAsString) {
    const parsedAlbum = JSON.parse(lastAlbumSelectedAsString);
    alert(
      `L'utima volta hai selezionato l'artista: ${parsedAlbum.artist} e la canzone: ${parsedAlbum.title}`
    );
  }
};
