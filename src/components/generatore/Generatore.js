import "./Generatore.css";
import { useState } from "react";
import { cor } from "../altro/sources";

const Generatore = ({ inventario, setInventario, setShowGeneratore, caricaInventario }) => {
  const [input, setInput] = useState("100");

  const updateInventario = function () {
    if (input === "0") return;

    var nuovoInventario = caricaInventario(inventario, parseInt(input));

    setInventario(nuovoInventario);
    setShowGeneratore((prevState) => !prevState);
  };

  return (
    <div className="containerGeneratore pattern shadow">
      <img className="sourceCor" src={cor} alt={`Cor.png`} />
      <div className="containerLabelInput">
        <label>Inserisci i Cor da aprire</label>
        <input
          type="number"
          min="0"
          max="999"
          name="nome"
          className="inputQuantita"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
      </div>
      <input className="buttonMetin" type="button" value="Apri Cor" onClick={() => updateInventario()} />
    </div>
  );
};

export default Generatore;
