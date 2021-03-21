import "./App.css";
import { useState, useEffect } from "react";
import Inventario from "./components/inventario/Inventario";
import Navbar from "./components/navbar/Navbar";
import Generatore from "./components/generatore/Generatore";
import Percentuali from "./components/percentuali/Percentuali";
import Miglioramenti from "./components/miglioramenti/Miglioramenti";

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
  const [showInventario, setShowInventario] = useState(true);
  const [showGeneratore, setShowGeneratore] = useState(true);
  const [showPercentuali, setShowPercentuali] = useState(true);
  const [showMiglioramenti, setShowMiglioramenti] = useState(true);
  const [inventario, setInventario] = useState(() => creaInventario());
  const [percentuali, setPercentuali] = useState(defaultPercentuali);

  useEffect(() => {
    console.log("USE EFFECT APP");
  }, [inventario]);

  //console.log(inventario);

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

    console.log("usato il nuovo set inventario");
  };

  return (
    <div className="app unselectable">
      <Navbar
        setShowInventario={setShowInventario}
        setShowGeneratore={setShowGeneratore}
        setShowPercentuali={setShowPercentuali}
        setShowMiglioramenti={setShowMiglioramenti}
      />
      <div className="containerAll">
        {showInventario && (
          <Inventario checkSelezionati={checkSelezionati} setInventario={setInventario} inventario={inventario} />
        )}
        <div>
          {showMiglioramenti && <Miglioramenti />}
          {showPercentuali && <Percentuali percentuali={percentuali} setPercentuali={setPercentuali} />}
        </div>
        {showGeneratore && (
          <Generatore
            inventario={inventario}
            caricaInventario={caricaInventario}
            setInventario={setInventario}
            setShowGeneratore={setShowGeneratore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
