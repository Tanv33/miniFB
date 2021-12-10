import React from "react";
import loader from "./ajax-loader.gif";
function Spinner() {
  return (
    <div
      style={{
        position: "relative",
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={loader} alt="loading..." />
    </div>
  );
}

export default Spinner;
