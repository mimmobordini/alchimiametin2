import "./PietraDrago.css";
import { useState, useEffect } from "react";
import { sourceMapIcona } from "../altro/sources";

const PietraDrago = ({
  pietraDrago,
  inventario,
  setInventario,
  index,
  checkSelezionati,
  popolaGridMiglioramenti,
  showPopup,
}) => {
  const [, setCounter] = useState(0);

  useEffect(() => {
    setCounter((prev) => prev + 1);
    //console.log("AGGIORNATA PIETRA DRAGO");
  }, [inventario, showPopup]);

  const handleSelected = function () {
    var controlloSelezionati = checkSelezionati(pietraDrago.tipo, pietraDrago.classe);

    if (controlloSelezionati["true"]) {
      if (controlloSelezionati["true"] >= 2) {
        if (!pietraDrago["attributi"]["selected"]) {
          return;
        }
      }
    }

    setInventario((prevState) => {
      prevState[pietraDrago.tipo]["classe"][pietraDrago.classe][index]["attributi"]["selected"] = !prevState[
        pietraDrago.tipo
      ]["classe"][pietraDrago.classe][index]["attributi"]["selected"];
      return { ...prevState };
    });
    popolaGridMiglioramenti();
  };

  return (
    <div
      className="containerPietraDrago"
      style={{ backgroundColor: pietraDrago["attributi"]["selected"] ? "rgba(255, 0, 0, 0.3)" : undefined }} //da cambiare
      onClick={() => handleSelected()}
    >
      <img
        className="pietraDrago octagon"
        src={sourceMapIcona[`Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}`]}
        alt={`${pietraDrago.tipo}/Icona_${pietraDrago.tipo}_${pietraDrago.classe}_${pietraDrago.attributi.grado}.png`}
      />
    </div>
  );
};

export default PietraDrago;
