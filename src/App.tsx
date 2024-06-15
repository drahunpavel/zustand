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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SagaComponent from "./components/saga-component";

// ассинхронный вызов получения списка за пределами компонента до рендеринга компонента
// useStoreTodos.getState().fetchTodos();

function App() {
  console.log("--render: App");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
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
          }
        />
        <Route path="saga" element={<SagaComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
