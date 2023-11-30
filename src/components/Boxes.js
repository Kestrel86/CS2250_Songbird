import "../assets/css/box.css";
import { useState, useEffect, useCallback } from "react";
import Box from "./Box";

//file where automatic generation occurs

export default function Boxes(props) {
  const { email, name, msg, donation } = props;

  const [boxes, setBoxes] = useState([]);

  return (
    <div className="container">
      <h1>Sponsors:</h1>
      <div className="items">
        {/* {boxes?.map((email, name, msg, donation) => {
          return <Box />;
        })} */}
        <Box />
        <Box />
      </div>
    </div>
  );
}

/*
{events?.map((event, index) => {
    return (
      <Event key={index} {...event}/>
    )
  })}
  */
