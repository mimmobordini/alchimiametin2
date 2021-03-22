import "./Miglioramenti.css";
import { useState } from "react";
import sourceRaffinamento from "../../resources/Raffinamento.png";

import tabClasse from "../../resources/tabClasse.png";
import tabGrado from "../../resources/tabGrado.png";
import tabLivello from "../../resources/tabLivello.png";

//classe grado   da gestire livello

const menu = {
  classe: tabClasse,
  grado: tabGrado,
  livello: tabLivello,
};

const Miglioramenti = ({ deselectAll, gridPietre, setGridPietre, openPopup, percentuali, aggiungiPietra }) => {
  const [tabScelta, setTabScelta] = useState("classe");

  const get_result = function (scelta) {
    var result;

    for (var i = 0; i < Object.keys(percentuali).length; i++) {
      var element = Object.keys(percentuali)[i];

      if (element.startsWith(scelta)) {
        var filtro = parseInt(percentuali[element]);
        var random = Math.floor(Math.random() * 100);

        console.log(random, filtro);

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

  const controllaStatus = function () {
    if (gridPietre.length !== 2) {
      openPopup("coglione mettici le pietre");
      return false;
    }

    if (gridPietre[0]["classe"] === "Mitico" || gridPietre[1]["classe"] === "Mitico") {
      openPopup("sono mitici coglione, hai finito");
      return false;
    }

    if (gridPietre[0]["attributi"]["grado"] === "Eccellente" || gridPietre[1]["attributi"]["grado"] === "Eccellente") {
      openPopup("sono eccellenti coglione, hai finito");
      return false;
    }

    if (gridPietre[0]["attributi"]["livello"] === 4 || gridPietre[1]["attributi"]["livello"] === 4) {
      openPopup("sono livello 4 coglione, hai finito");
      return false;
    }

    return true;
  };

  const handleMigliora = function () {
    if (!controllaStatus()) return;

    switch (tabScelta) {
      case "classe":
        if (get_result(gridPietre[0]["classe"])) {
          openPopup("riuscito"); //NO APRIRE POPUP
          deselectAll(true, true);

          aggiungiPietra("Diamante", "Mitico", "Eccellente", 0); //TESTING
          console.log("asd");
        } else {
          openPopup("fallito"); //NO APRIRE POPUP
          deselectAll(true, false);
        }

        break;
      case "grado":
        if (gridPietre[0]["attributi"]["grado"] !== gridPietre[1]["attributi"]["grado"]) {
          openPopup("sono grado diverso coglione");
          return;
        }

        if (get_result(gridPietre[0]["attributi"]["grado"])) {
          openPopup("riuscito"); //NO APRIRE POPUP
          deselectAll(true, true);
        } else {
          openPopup("fallito"); //NO APRIRE POPUP
          deselectAll(true, false);
        }

        break;
      case "livello":
        openPopup("migliora livello TODO");
        break;
      default:
        break;
    }
  };

  return (
    <div className="containerMiglioramenti shadow">
      <img className="sourceRaffinamento" src={sourceRaffinamento} alt={`Raffinamento.png`} />
      <img className="sourceTabMiglioramenti" src={menu[tabScelta]} alt={tabScelta} />
      <div className="containerTabMiglioramenti">
        {Object.keys(menu).map(function (key, index) {
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
                src={`/${pietraDrago.tipo}/Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}.png`}
                alt={`/${pietraDrago.tipo}/Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}.png`}
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
