import React from "react";

const OutputSection = ({ data }) => {
  return (
    <div>
      <h3>Response Data:</h3>
      <p>Sum: {data.sum}</p>
      <p>Average: {data.average}</p>
      <p>Median: {data.median}</p>
    </div>
  );
};

export default OutputSection;
