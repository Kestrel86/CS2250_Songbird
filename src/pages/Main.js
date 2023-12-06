import React, { useState, useEffect } from "react";
import Songbird from "./Songbird";
import Login from "./Login";

function Main() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch(
          "https://songbird.onrender.com/auth/token"
        );
        const json = await response.json();
        setToken(json.access_token);
      } catch {}
    }

    getToken();
  }, []);
  return <>{token === "" ? <Login /> : <Songbird token={token} />}</>;
}

export default Main;
