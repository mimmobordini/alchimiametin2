import "./Inventario.css";
import SlotsInventario from "../slotInventario/SlotsInventario";
import { useState } from "react";
import { sourceInventario, sourceMapTipo } from "../altro/sources";

const Inventario = ({
  inventario,
  checkSelezionati,
  setInventario,
  deselectAll,
  popolaGridMiglioramenti,
  showPopup,
}) => {
  const [showTipo, setShowTipo] = useState("Diamante");
  const [showClasse, setShowClasse] = useState("Grezzo");

  const handleTipo = function (tipo) {
    setShowTipo(tipo);
    deselectAll();
  };

  const handleClasse = function (classe) {
    setShowClasse(classe);
    deselectAll();
  };

  return (
    <div className="containerInventario shadow">
      <img className="sourceInventario" src={sourceInventario} alt={`Inventario.png`} />
      {Object.keys(inventario).map(function (key, index) {
        return (
          key === showTipo && (
            <div key={index}>
              <img className="sourceTab" src={sourceMapTipo[key]} alt={`${key}.png`} />
              <div className="tabButtons">
                {Object.keys(inventario).map(function (key, index) {
                  return <div key={index} className="buttonTab" onClick={() => handleTipo(key)} />;
                })}
              </div>
              <SlotsInventario
                tipoInventario={inventario[key]["classe"]}
                showClasse={showClasse}
                setShowClasse={handleClasse}
                setInventario={setInventario}
                checkSelezionati={checkSelezionati}
                popolaGridMiglioramenti={popolaGridMiglioramenti}
                inventario={inventario}
                showPopup={showPopup}
              />
            </div>
          )
        );
      })}
    </div>
  );
};
export default Inventario;
