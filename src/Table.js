import React from "react";
import "./Table.css";
// import { v4 as uuidv4 } from "uuid";

const Table = ({ countries }) => {
  return (
    <div className="Table">
      {countries.map(({ country, cases }, i) => (
        <div key={i} className="tablelist">
          <div>{country}</div>
          <div>
            <strong>{cases}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
