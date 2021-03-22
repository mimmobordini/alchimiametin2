import "./Navbar.css";

const Navbar = ({ setShowGeneratore }) => {
  return (
    <nav className="navbar">
      <span className="logo">Alchimia Metin2</span>
      <ul>
        <li>
          <input
            type="button"
            className="navbarTabButton"
            value="Generatore"
            onClick={setShowGeneratore.bind(this, (prevState) => !prevState)}
          />
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
