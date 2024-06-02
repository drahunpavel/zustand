import React, { useRef } from "react";
import { TodoItem } from ".";
import { useStoreTodos } from "../store/useStoreTodos";
import { useStoreFilter } from "../store/useStoreFilter";

const TodoList = () => {
  const filter = useStoreFilter((state) => state.filter);
  const todos = useStoreTodos((state) => {
    switch (filter) {
      case "available":
        return state.todos.filter((todo) => !todo.done);
      case "marked":
        return state.todos.filter((todo) => todo.done);

      default:
        return state.todos;
    }
  });

  const todoListRef = useRef();

  console.log("--render: TodoList");

  return (
    todos.length > 0 && (
      <ul className="todo-list" ref={todoListRef}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    )
  );
};

export default TodoList;
