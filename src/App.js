import "./App.css";

import { useState, useEffect } from "react";

//COMPONENTS
import Inventario from "./components/inventario/Inventario";
import Navbar from "./components/navbar/Navbar";
import Generatore from "./components/generatore/Generatore";
import Percentuali from "./components/percentuali/Percentuali";
import Miglioramenti from "./components/miglioramenti/Miglioramenti";
import Popup from "./components/popup/Popup";

//FUNZIONI E VARIABILI A SUPPORTO
import { creaInventario, defaultPercentuali, generaPietra, caricaInventario } from "./components/altro/altro";

/************************************************************************************************************/

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

    setGridPietre(newGrid);
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

  const deselectAll = function (flagDelete = false, risultatoRaffinamento = false) {
    setInventario((prevState) => {
      for (var i = 0; i < Object.keys(prevState).length; i++) {
        var elemento = Object.keys(prevState)[i]; //DIAMANTE

        for (var j = 0; j < Object.keys(prevState[elemento]["classe"]).length; j++) {
          var tipo = Object.keys(prevState[elemento]["classe"])[j]; //GREZZO

          if (prevState[elemento]["classe"][tipo].length !== 0) {
            var flagSkip = false;

            prevState[elemento]["classe"][tipo].forEach((element, index) => {
              // console.log(element);
              if (element["attributi"]["selected"] === true) {
                if (flagDelete) {
                  if (!flagSkip) {
                    //CANCELLO ENTRAMBI I COR PERCHE HA RAFFINATO E NON DEVE SKIPPARE

                    //prevState[elemento]["classe"][tipo].splice(index, index + 1);
                    delete prevState[elemento]["classe"][tipo][index];
                    // console.log("cancellato");
                    if (!risultatoRaffinamento) {
                      flagSkip = true;
                    }
                  }
                }
              }

              element["attributi"]["selected"] = false;
            });

            prevState[elemento]["classe"][tipo] = prevState[elemento]["classe"][tipo].filter(function () {
              return true;
            });
          }
        }
      }

      return { ...prevState };
    });

    setGridPietre([]);
  };

  const aggiungiPietra = function (tipo, classe, grado, livello) {
    var pietra = generaPietra(tipo, classe, livello, grado);
    let newArray = [...inventario[tipo]["classe"][classe]];
    newArray.push(pietra);

    setInventario((prevState) => {
      prevState[tipo]["classe"][classe] = newArray;

      return { ...prevState };
    });
  };

  const openPopup = function (message) {
    setPopupMessage(message);
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="app unselectable">
      <Navbar setShowGeneratore={setShowGeneratore} />

      <div className="containerAll">
        {showGeneratore && (
          <Generatore
            inventario={inventario}
            caricaInventario={caricaInventario}
            setInventario={setInventario}
            setShowGeneratore={setShowGeneratore}
          />
        )}
        {!showGeneratore && (
          <div className="containerRow">
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
                aggiungiPietra={aggiungiPietra}
              />
              <Percentuali percentuali={percentuali} setPercentuali={setPercentuali} />
            </div>
          </div>
        )}
        {showPopup && <Popup setShowPopup={setShowPopup} popupMessage={popupMessage} />}
      </div>
    </div>
  );
}

export default App;
