import "./Popup.css";

const Popup = ({ popupMessage, setShowPopup }) => {
  return (
    <div className="containerPopup">
      <div className="popup pattern shadow">
        <span>{popupMessage}</span>

        <input
          className="buttonMetin conferma"
          type="button"
          value="Ok"
          onClick={() => setShowPopup((prevState) => !prevState)}
        />
      </div>
    </div>
  );
};

export default Popup;
