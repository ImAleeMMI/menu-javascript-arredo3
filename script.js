// Definisci il Menu
const menu = [
  { id: 1, nome: "Insalata Caprese", tipo: "antipasto", prezzo: 8.50, ordinato: false },
  { id: 2, nome: "Bresaola, ricotta e rucola", tipo: "antipasto", prezzo: 8.00, ordinato: false },
  { id: 3, nome: "Tortino al radicchio", tipo: "antipasto", prezzo: 7.50, ordinato: false },
  { id: 4, nome: "Pasta al Pesto", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 5, nome: "Lasagne al ragù", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 6, nome: "Carbonara", tipo: "primo", prezzo: 12.50, ordinato: false },
  { id: 7, nome: "Pasta al tonno", tipo: "primo", prezzo: 9.50, ordinato: false },
  { id: 8, nome: "Bistecca alla Griglia", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 9, nome: "Orata al forno", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 10, nome: "Spezzatino di maiale", tipo: "secondo", prezzo: 20.00, ordinato: false },
  { id: 11, nome: "Tagliata di manzo", tipo: "secondo", prezzo: 25.00, ordinato: false },
  { id: 12, nome: "Tiramisù", tipo: "dessert", prezzo: 9.50, ordinato: false },
  { id: 13, nome: "Gelato", tipo: "dessert", prezzo: 9.50, ordinato: false },
  { id: 14, nome: "Meringata", tipo: "dessert", prezzo: 9.50, ordinato: false }
  // Altri piatti ....
];

function generaSelectTipo() {
  var tipi = [...new Set(menu.map(item => item.tipo))];
  tipi.unshift('Seleziona una categoria');
  const tipoPiattoSelect = document.getElementById('tipo-piatto');

  tipi.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.text = tipo;
    tipoPiattoSelect.appendChild(option);
  });
}

function showPiatti(tipoPiatto) {

  // filtro l'oggetto menu in base al piatto passato
  var piattiTipo = menu.filter(piatto => piatto.tipo == tipoPiatto);
  var piatti = document.querySelector("#piatti");
  piatti.innerHTML = "";
  piattiTipo.forEach(function (piatto) {
    // creo un oggetto div contente il nome del piatto
    var divPiatto = document.createElement("div");
    divPiatto.textContent = piatto.nome;

    piatti.appendChild(divPiatto);

    // aggancio l'eventListener al click su ogni elemento. al click invoco la funzione addPiatto a cui va passato il piatto da aggiungere all'ordine
    divPiatto.addEventListener("click", function () {
      addPiatto(piatto);
    });
  })
}

var ordine = JSON.parse(localStorage.getItem('ordine')) ?? [];
var prezzoTotale = localStorage.getItem('totale') ?? 0;

function addPiatto(piatto) {

  alert("Aggiunto " + piatto.nome + " all'ordine");
  // aggiungo il piatto all'ordine
  ordine.push(piatto);
  localStorage.setItem('ordine', JSON.stringify(ordine))
  console.log(ordine);

  //Richiamo la funzione showOrder
  showOrder()

}

function showOrder() {
  
  // visualizzo in un contenitore tutti i piatti dell'ordine
  var contenitorePiatti = document.getElementById('ordine');
  contenitorePiatti.innerHTML = "";
  var contenitorePrezzi = document.getElementById('prezzo');
  contenitorePrezzi.innerHTML = "";
  ordine.forEach(function (piatto) {
    var divOrdine = document.createElement("div");
    divOrdine.textContent = piatto.nome;
    divOrdine.classList.add('piatto-ordine')
    contenitorePiatti.appendChild(divOrdine);

    

    //Delete
    var iconaCancella = document.createElement("span");
    iconaCancella.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    iconaCancella.classList.add('delete')
    iconaCancella.addEventListener("click", function () {
      removePiatto(piatto);
    });
    divOrdine.appendChild(iconaCancella);
    // Prezzo
    var divOrdinePrezzo = document.createElement("span");
    divOrdinePrezzo.textContent = piatto.prezzo;
    divOrdinePrezzo.classList.add('prezzo');
    divOrdine.appendChild(divOrdinePrezzo)
  })
  //richiamo la funzione calcTotal
  calcTotal()

}

function removePiatto(piatto) {
  var indice = ordine.indexOf(piatto);
  if (indice !== -1) {
    ordine.splice(indice, 1);
    localStorage.setItem('ordine', JSON.stringify(ordine));
    showOrder();
  }
}


// calcolo e stampo il l'importo totale dell'ordine
function calcTotal() {
  var prezzoTotale = ordine.reduce((acc, piatto) => acc + piatto.prezzo, 0);
  localStorage.setItem('totale', prezzoTotale);
  document.getElementById('totale').innerHTML = prezzoTotale;
  console.log(prezzoTotale);


}

