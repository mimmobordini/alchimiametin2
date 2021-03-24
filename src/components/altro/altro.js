const classe = ["Grezzo", "Tagliato", "Raro", "Antico", "Leggendario", "Mitico"];
const livello = [0, 1, 2, 3, 4];
const grado = ["Opaco", "Chiaro", "Limpido", "Brillante", "Eccellente"];
const listaElementi = ["Diamante", "Rubino", "Giada", "Zaffiro", "Granato", "Onice"];

const creaInventario = function () {
  var inventario = {};

  for (var i = 0; i < listaElementi.length; i++) {
    inventario[listaElementi[i]] = {
      classe: {
        Grezzo: [],
        Tagliato: [],
        Raro: [],
        Antico: [],
        Leggendario: [],
        Mitico: [],
      },
    };
  }

  return inventario;
};

const randomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generaPietra = function (tipo = "Diamante", classe = "Grezzo", livello = 0, grado = "Opaco") {
  var elemento = {
    tipo: tipo,
    classe: classe,
    attributi: {
      livello: livello,
      grado: grado,
      selected: false,
    },
  };
  return elemento;
};

const caricaInventario = function (inventario, numeroCor) {
  for (var i = 0; i < numeroCor; i++) {
    var estratto = listaElementi[randomInRange(0, 5)];
    var elemento = generaPietra(estratto, "Grezzo", 0, "Opaco");

    if (inventario[estratto]["classe"]["Grezzo"].length < 32) {
      inventario[estratto]["classe"]["Grezzo"].push(elemento);
    }
  }

  return inventario;
};

const defaultPercentuali = {
  Grezzo_a_Tagliato: 50,
  Tagliato_a_Raro: 49,
  Raro_a_Antico: 48,
  Antico_a_Leggendario: 47,
  Leggenario_a_Mitico: 46,
  /************************/
  Opaco_a_Chiaro: 45,
  Chiaro_a_Limpido: 44,
  Limpido_a_Brillante: 43,
  Brillante_a_Eccellente: 42,
};

export { creaInventario, defaultPercentuali, generaPietra, caricaInventario };
