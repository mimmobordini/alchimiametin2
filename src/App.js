import "./App.css";
import { useState, useEffect } from "react";
import Inventario from "./components/inventario/Inventario";
import Navbar from "./components/navbar/Navbar";
import Generatore from "./components/generatore/Generatore";
import Percentuali from "./components/percentuali/Percentuali";
import Miglioramenti from "./components/miglioramenti/Miglioramenti";
import Popup from "./components/popup/Popup";

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

const generaCor = function (tipo = "Diamante", classe = "Grezzo", livello = 0, grado = "Opaco") {
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
    var elemento = generaCor(estratto, "Grezzo", 0, "Opaco");

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

function App() {
  const [showGeneratore, setShowGeneratore] = useState(true);
  const [gridPietre, setGridPietre] = useState([]);
  const [inventario, setInventario] = useState(() => creaInventario());
  const [percentuali, setPercentuali] = useState(defaultPercentuali);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    //console.log("USE EFFECT APP");
  }, [inventario, showPopup]);

  const popolaGridMiglioramenti = function () {
    var newGrid = [];

    for (var i = 0; i < Object.keys(inventario).length; i++) {
      var elemento = Object.keys(inventario)[i]; //DIAMANTE

      for (var j = 0; j < Object.keys(inventario[elemento]["classe"]).length; j++) {
        var tipo = Object.keys(inventario[elemento]["classe"])[j]; //GREZZO

        if (inventario[elemento]["classe"][tipo].length !== 0) {
          inventario[elemento]["classe"][tipo].forEach((element) => {
            if (element["attributi"]["selected"]) {
              newGrid.push(element);
            }
          });
        }
      }
    }

    setGridPietre(newGrid); //DA SISTEMARE NON FUNZiONA
  };

  const checkSelezionati = function (tipo, classe) {
    const result = inventario[tipo]["classe"][classe].reduce((accumulator, current) => {
      const selected = current["attributi"]["selected"];
      if (accumulator[selected]) {
        accumulator[selected]++;
      } else {
        accumulator[selected] = 1;
      }
      return accumulator;
    }, {});

    return result;
  };

  const deselectAll = function () {
    //delete tempInventario["Diamante"]["classe"]["Grezzo"][0]; //TEST

    setInventario((prevState) => {
      for (var i = 0; i < Object.keys(prevState).length; i++) {
        var elemento = Object.keys(prevState)[i]; //DIAMANTE

        for (var j = 0; j < Object.keys(prevState[elemento]["classe"]).length; j++) {
          var tipo = Object.keys(prevState[elemento]["classe"])[j]; //GREZZO

          if (prevState[elemento]["classe"][tipo].length !== 0) {
            prevState[elemento]["classe"][tipo].forEach((element) => {
              element["attributi"]["selected"] = false;
            });
          }
        }
      }

      return { ...prevState };
    });

    setGridPietre([]);
  };

  const openPopup = function (message) {
    setPopupMessage(message);
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="app unselectable">
      <Navbar setShowGeneratore={setShowGeneratore} />
      <div className="containerAll">
        <Inventario
          checkSelezionati={checkSelezionati}
          setInventario={setInventario}
          inventario={inventario}
          deselectAll={deselectAll}
          popolaGridMiglioramenti={popolaGridMiglioramenti}
          showPopup={showPopup}
        />
        <div>
          <Miglioramenti
            deselectAll={deselectAll}
            gridPietre={gridPietre}
            setGridPietre={setGridPietre}
            openPopup={openPopup}
            percentuali={percentuali}
          />
          <Percentuali percentuali={percentuali} setPercentuali={setPercentuali} />
        </div>
        {showGeneratore && (
          <Generatore
            inventario={inventario}
            caricaInventario={caricaInventario}
            setInventario={setInventario}
            setShowGeneratore={setShowGeneratore}
          />
        )}
        {showPopup && <Popup setShowPopup={setShowPopup} popupMessage={popupMessage} />}
      </div>
    </div>
  );
}

export default App;
