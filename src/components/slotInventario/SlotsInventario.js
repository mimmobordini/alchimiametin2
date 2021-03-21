import SingoloSlotInventario from "./SingoloSlotInventario";
import "./SlotInventario.css";

const SlotsInventario = ({
  tipoInventario,
  inventario,
  setInventario,
  showClasse,
  setShowClasse,
  checkSelezionati,
}) => {
  return (
    <div>
      {Object.keys(tipoInventario).map(function (key, index) {
        return (
          key === showClasse && (
            <div key={index}>
              <img className="sourceTabClasse" src={`/Tab/${key}.png`} alt={`/Tab/${key}.png`} />

              <div className="tabTipo">
                {Object.keys(tipoInventario).map(function (key, index) {
                  return <div key={index} className="buttonTipo" onClick={() => setShowClasse(key)} />;
                })}
              </div>

              <SingoloSlotInventario
                setInventario={setInventario}
                listaPezzi={tipoInventario[key]}
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
export default SlotsInventario;
