import React from "react";
import "./index.css";
import {
  Boundary,
  TodoControls,
  TodoFilter,
  TodoForm,
  TodoInfo,
  TodoList,
} from "./components";
import { useStoreTodos } from "./store/useStoreTodos";

// ассинхронный вызов получения списка за пределами компонента до рендеринга компонента
useStoreTodos.getState().fetchTodos();

function App() {
  console.log("--render: App");

  return (
    <div className="container">
      <header>
        <h1>Zustand Todos App</h1>
      </header>
      <main>
        <Boundary>
          <TodoFilter />
          <hr />
          <TodoForm />
          <TodoInfo />
          <TodoControls />
          <TodoList />
        </Boundary>
      </main>
    </div>
  );
}

export default App;
