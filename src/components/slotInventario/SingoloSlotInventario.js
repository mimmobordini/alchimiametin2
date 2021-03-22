import PietraDrago from "../pietraDrago/PietraDrago";

const SingoloSlotInventario = ({
  listaPezzi,
  inventario,
  setInventario,
  checkSelezionati,
  popolaGridMiglioramenti,
  showPopup,
}) => {
  return (
    <div className="singoloSlotInventario">
      {listaPezzi.map(function (key, index) {
        return (
          <PietraDrago
            inventario={inventario}
            setInventario={setInventario}
            key={index}
            pietraDrago={key}
            index={index}
            checkSelezionati={checkSelezionati}
            popolaGridMiglioramenti={popolaGridMiglioramenti}
            showPopup={showPopup}
          />
        );
      })}
    </div>
  );
};
export default SingoloSlotInventario;
