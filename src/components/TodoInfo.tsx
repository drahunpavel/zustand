import React from "react";
import { useStoreTodos } from "../store/useStoreTodos";

const TodoInfo = () => {
  const { todos, info } = useStoreTodos(({ todos, info }) => ({
    todos,
    info,
  }));

  console.log("--render: TodoInfo");

  if (!info || !todos.length) return null;

  return (
    <div className="todo-info">
      {["Total", "Available", "Marked", "Free"].map((k) => (
        <span key={k}>
          {k}: {info[k.toLowerCase()]}
        </span>
      ))}
    </div>
  );
};

export default TodoInfo;
