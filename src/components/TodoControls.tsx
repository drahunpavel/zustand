import React from "react";
import { shallow } from "zustand/shallow";
import useStore from "../store";

const TodoControls = () => {
  const { todos, completeActiveTodos, removeCompletedTodos } = useStore(
    ({ todos, actions }) => ({
      todos,
      completeActiveTodos: actions.completeActiveTodos,
      removeCompletedTodos: actions.removeCompletedTodos,
    }),
    shallow
  );

  if (!todos.length) return null;

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
