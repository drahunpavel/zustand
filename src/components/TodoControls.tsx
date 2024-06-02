import React from "react";
import { useStoreTodos } from "../store/useStoreTodos";
import { shallow } from "zustand/shallow";

const TodoControls = () => {
  const { completeActiveTodos, removeCompletedTodos } = useStoreTodos(
    (state) => ({
      completeActiveTodos: state.completeActiveTodos,
      removeCompletedTodos: state.removeCompletedTodos,
    }),
    shallow
  );

  console.log("--render: TodoControls");

  return (
    <div className="todo-controls">
      <button className="btn-complete" onClick={completeActiveTodos}>
        Mark all todos
      </button>
      <button className="btn-remove" onClick={removeCompletedTodos}>
        Remove marked todos
      </button>
    </div>
  );
};

export default TodoControls;
