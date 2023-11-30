import "../assets/css/box.css";
import { useState, useEffect, useCallback } from "react";
import Box from "./Box";
import axios from "axios";

//file where automatic generation occurs

export default function Boxes(props) {
  const [selectData, setSelectData] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [boxes, setBoxes] = useState([]);

  const { email, name, msg, donation } = props;

  const axiosFetchData = async (processing) => {
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        if (processing) {
          setSelectData(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Sponsors:</h1>
      <div className="items">
        {boxes?.map((email, name, msg, donation) => {
          return (
            <Box
              email={props.email}
              name={props.name}
              msg={props.msg}
              donation={props.donation}
            />
          );
        })}
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
