import SingoloSlotInventario from "./SingoloSlotInventario";
import "./SlotInventario.css";
import { sourceMapClasse } from "../altro/sources";

const SlotsInventario = ({
  tipoInventario,
  inventario,
  setInventario,
  showClasse,
  setShowClasse,
  checkSelezionati,
  popolaGridMiglioramenti,
  showPopup,
}) => {
  return (
    <div>
      {Object.keys(tipoInventario).map(function (key, index) {
        return (
          key === showClasse && (
            <div key={index}>
              <img className="sourceTabClasse" src={sourceMapClasse[key]} alt={`${key}.png`} />

              <div className="tabTipo">
                {Object.keys(tipoInventario).map(function (key, index) {
                  return <div key={index} className="buttonTipo" onClick={() => setShowClasse(key)} />;
                })}
              </div>

              <SingoloSlotInventario
                setInventario={setInventario}
                listaPezzi={tipoInventario[key]}
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
export default SlotsInventario;
