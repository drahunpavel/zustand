import React from "react";
import { gsap } from "gsap";
import useStore from "../store";
//сравнения объектов
import { shallow } from "zustand/shallow";

const TodoItem = ({ todo }) => {
  const { updateTodo, removeTodo } = useStore(
    (state) => ({
      updateTodo: state.actions.updateTodo,
      removeTodo: state.actions.removeTodo,
    }),
    shallow
  );

  const remove = (id: string, target: gsap.TweenTarget) => {
    gsap.to(target, {
      opacity: 0,
      x: -100,

      onComplete() {
        removeTodo(id);
      },
    });
  };

  const { id, text, done } = todo;

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={() => {
          updateTodo(id);
        }}
        checked={done}
      />
      <span
        style={done ? { textDecoration: "line-through" } : {}}
        className="todo-text"
      >
        {text}
      </span>
      <button
        className="btn-remove"
        onClick={(e) => {
          //@ts-ignore
          remove(id, e.target.parentElement);
        }}
      >
        ✖
      </button>
    </li>
  );
};

export default TodoItem;
