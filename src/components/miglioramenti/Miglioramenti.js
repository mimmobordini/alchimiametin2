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

const Miglioramenti = () => {
  const [tabScelta, setTabScelta] = useState("livello");
  return (
    <div className="containerMiglioramenti shadow">
      <img className="sourceRaffinamento" src={sourceRaffinamento} alt={`Raffinamento.png`} />
      <img className="sourceTabMiglioramenti" src={menu[tabScelta]} alt={tabScelta} />
    </div>
  );
};
export default Miglioramenti;
