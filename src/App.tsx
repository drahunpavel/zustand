import React, { useEffect } from "react";
import "./App.css";
import useStore from "./store";

useStore.getState();

function App() {
  useEffect(() => {
    console.log("first render");
  }, []);

  console.log(" render");

  return <div>1111</div>;
}

export default App;
