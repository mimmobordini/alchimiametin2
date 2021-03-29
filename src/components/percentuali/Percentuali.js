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
                onBlur={(e) => {
                  if (e.target.value > 100) handleChange(key, 100);
                  if (e.target.value < 0) handleChange(key, 0);
                }}
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
