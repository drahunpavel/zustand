import React, { useEffect } from "react";
import "./index.css";
import useStore from "./store";

// ассинхронный вызов получения списка
useStore.getState().actions.fetchTodos();

function App() {
  useEffect(() => {
    console.log("first render");
  }, []);

  console.log(" render");

  return <div>1111</div>;
}

export default App;
