import "./Navbar.css";

const Navbar = ({ setShowInventario, setShowGeneratore, setShowPercentuali, setShowMiglioramenti }) => {
  return (
    <nav className="navbar">
      <div>
        <span>Alchimia Metin2</span>
      </div>
      <ul>
        <li>
          <input
            type="button"
            value="mostra/nascondi Inventario"
            onClick={setShowInventario.bind(this, (prevState) => !prevState)}
          />
        </li>
        <li>
          <input
            type="button"
            value="mostra/nascondi Generatore"
            onClick={setShowGeneratore.bind(this, (prevState) => !prevState)}
          />
        </li>
        <li>
          <input
            type="button"
            value="mostra/nascondi Percentuali"
            onClick={setShowPercentuali.bind(this, (prevState) => !prevState)}
          />
        </li>
        <li>
          <input
            type="button"
            value="mostra/nascondi Miglioramenti"
            onClick={setShowMiglioramenti.bind(this, (prevState) => !prevState)}
          />
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
