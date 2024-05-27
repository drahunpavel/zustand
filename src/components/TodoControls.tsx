import React from "react";
import { useTodosStore } from "../store/hooks";

const TodoControls = () => {
  const { completeActiveTodos, removeCompletedTodos } = useTodosStore();

  console.log("--render: TodoControls");

  // if (!todos.length) return null;

  return (
    <div className="todo-controls">
      <button className="btn-complete" onClick={completeActiveTodos}>
        Complete all todos
      </button>
      <button className="btn-remove" onClick={removeCompletedTodos}>
        Remove completed todos
      </button>
    </div>
  );
};

export default TodoControls;
