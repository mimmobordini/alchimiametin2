import "./Percentuali.css";

const Percentuali = ({ percentuali, setPercentuali }) => {
  const handleChange = (key, value) => {
    setPercentuali((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="containerPercentuali pattern shadow">
      {Object.keys(percentuali).map(function (key, index) {
        return (
          <div key={index} className="variePercent">
            <span>{key.replace(/_/g, " ")}</span>
            <span>
              <input
                type="number"
                min="0"
                max="100"
                name="percent"
                value={percentuali[key]}
                className="inputQuantita"
                onInput={(e) => handleChange(key, e.target.value)}
              />
              %
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Percentuali;
