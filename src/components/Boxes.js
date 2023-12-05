import React, { useState, useEffect } from "react";
import Box from "./Box";
import axios from "axios";
import "../assets/css/box.css";

export default function Boxes() {
  const [selectData, setSelectData] = useState([]);

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);
    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchData = async (processing) => {
    await axios
      .get("https://songbird.onrender.com/support")
      .then((res) => {
        if (processing) {
          setSelectData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Sponsors:</h1>
      <br />
      <div className="items">
        {selectData?.map((item) => (
          <Box
            email={item.email}
            name={item.name}
            msg={item.message}
            donation={item.donation}
          />
        ))}
      </div>
    </div>
  );
}
