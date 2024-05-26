import React, { useEffect } from "react";
import "./index.css";
import useStore from "./store";

// ассинхронный вызов получения списка за пределами компонента до рендеринга компонента
useStore.getState().actions.fetchTodos();

function App() {
  useEffect(() => {
    console.log("first render");
  }, []);

  console.log(" render");

  return (
    <>
      <header>
        <h1>Zustand Todos App</h1>
      </header>
      <main>1</main>
      <footer>2</footer>
    </>
  );
}

export default App;
