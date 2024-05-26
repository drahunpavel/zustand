import React, { useEffect } from "react";
import "./index.css";
import useStore from "./store";
import {
  Boundary,
  TodoControls,
  TodoForm,
  TodoInfo,
  TodoList,
} from "./components";

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
      <main>
        <Boundary>
          <TodoForm />
          <TodoInfo />
          <TodoControls />
          <TodoList />
        </Boundary>
      </main>
      <footer>2</footer>
    </>
  );
}

export default App;
