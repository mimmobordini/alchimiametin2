import "./Inventario.css";
import SlotsInventario from "../slotInventario/SlotsInventario";
import { useState } from "react";
import sourceInventario from "../../resources/Inventario.png";

const Inventario = ({ inventario, checkSelezionati, setInventario }) => {
  const [showTipo, setShowTipo] = useState("Diamante");
  const [showClasse, setShowClasse] = useState("Grezzo");

  return (
    <div className="containerInventario shadow">
      <img className="sourceInventario" src={sourceInventario} alt={`Inventario.png`} />
      {Object.keys(inventario).map(function (key, index) {
        return (
          key === showTipo && (
            <div key={index}>
              <img className="sourceTab" src={`/Tab/${key}.png`} alt={`/Tab/${key}.png`} />
              <div className="tabButtons">
                {Object.keys(inventario).map(function (key, index) {
                  return <div key={index} className="buttonTab" onClick={() => setShowTipo(key)} />;
                })}
              </div>
              <SlotsInventario
                tipoInventario={inventario[key]["classe"]}
                showClasse={showClasse}
                setShowClasse={setShowClasse}
                setInventario={setInventario}
                checkSelezionati={checkSelezionati}
                inventario={inventario}
              />
            </div>
          )
        );
      })}
    </div>
  );
};
export default Inventario;
