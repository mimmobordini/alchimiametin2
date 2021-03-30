import "./Miglioramenti.css";
import { useState, useEffect, useCallback } from "react";
import { menuRaffinamento, sourceRaffinamento, sourceMapIcona } from "../altro/sources";
import { classe, livello, grado } from "../altro/altro";

const Miglioramenti = ({ deselectAll, gridPietre, setGridPietre, openPopup, percentuali, aggiungiPietra }) => {
  const [tabScelta, setTabScelta] = useState("classe");

  const handleUserKeyPress = useCallback((event) => {
    const { keyCode } = event;

    if (keyCode === 13) {
      handleMigliora();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const get_result = function (scelta) {
    var result;

    for (var i = 0; i < Object.keys(percentuali).length; i++) {
      var element = Object.keys(percentuali)[i];

      if (element.startsWith(scelta)) {
        var filtro = parseInt(percentuali[element]);
        var random = Math.floor(Math.random() * 100);

        if (random < filtro) {
          result = true;
        }
      }
    }

    return result;
  };

  const handleCambiaTab = function (tab) {
    if (tab === "livello") {
      //DA FARE PIU AVANTI TUTTA LA TARANTELLA DEL CHICCO
      return;
    }
    setTabScelta(tab);
    deselectAll();
  };

  const controllaStatus = function (tabScelta) {
    if (gridPietre.length !== 2) {
      openPopup("inserisci le pietre");
      return false;
    }

    if (tabScelta === "classe" && (gridPietre[0]["classe"] === "Mitico" || gridPietre[1]["classe"] === "Mitico")) {
      openPopup("sono mitici, hai finito");
      return false;
    }

    if (gridPietre[0]["attributi"]["grado"] === "Eccellente" || gridPietre[1]["attributi"]["grado"] === "Eccellente") {
      openPopup("sono eccellenti, hai finito");
      return false;
    }

    if (gridPietre[0]["attributi"]["livello"] === 4 || gridPietre[1]["attributi"]["livello"] === 4) {
      openPopup("sono livello 4, hai finito");
      return false;
    }

    return true;
  };

  const handleMigliora = function () {
    // console.log(gridPietre);
    if (!controllaStatus(tabScelta)) return;

    switch (tabScelta) {
      case "classe":
        if (get_result(gridPietre[0]["classe"])) {
          deselectAll(true, true);

          let indexClasse = classe.indexOf(gridPietre[0]["classe"]);

          aggiungiPietra(gridPietre[0]["tipo"], classe[indexClasse + 1], gridPietre[0]["attributi"]["grado"], 0);
        } else {
          deselectAll(true, false);
        }

        break;

      case "grado":
        if (gridPietre[0]["attributi"]["grado"] !== gridPietre[1]["attributi"]["grado"]) {
          openPopup("sono grado diverso ");
          return;
        }

        if (get_result(gridPietre[0]["attributi"]["grado"])) {
          deselectAll(true, true);
          let indexGrado = grado.indexOf(gridPietre[0]["attributi"]["grado"]);

          console.log(gridPietre[0]["tipo"], gridPietre[0]["classe"], grado[indexGrado + 1]);

          aggiungiPietra(gridPietre[0]["tipo"], gridPietre[0]["classe"], grado[indexGrado + 1], 0); //NON VA DA INDAGARE
        } else {
          deselectAll(true, false);
        }

        break;

      case "livello":
        break;
      default:
        break;
    }
  };

  return (
    <div className="containerMiglioramenti shadow">
      <img className="sourceRaffinamento" src={sourceRaffinamento} alt={`Raffinamento.png`} />
      <img className="sourceTabMiglioramenti" src={menuRaffinamento[tabScelta]} alt={tabScelta} />
      <div className="containerTabMiglioramenti">
        {Object.keys(menuRaffinamento).map(function (key, index) {
          return <div className="containerTabButton" key={index} onClick={() => handleCambiaTab(key)} />;
        })}
      </div>
      <div className="containerMiglioramentiGrid">
        {gridPietre.map(function (key, index) {
          var pietraDrago = gridPietre[index];
          return (
            <div key={index} className="containerPietraDrago">
              <img
                className="pietraDrago octagon"
                src={sourceMapIcona[`Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}`]}
                alt={`${pietraDrago.tipo}/Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}.png`}
              />
            </div>
          );
        })}
      </div>
      <div className="buttonRaffinamento" onClick={() => handleMigliora()} />
    </div>
  );
};
export default Miglioramenti;
