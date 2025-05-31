import "../styles/loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
