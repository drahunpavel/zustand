import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useStoreTodos } from "../store/useStoreTodos";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const addTodo = useStoreTodos((state) => state.addTodo);

  useEffect(() => {
    setIsDisabled(!text.trim());
  }, [text]);

  const onChange = ({ target: { value } }) => {
    setText(value);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isDisabled) return;
    const newTodo = {
      id: nanoid(),
      text,
      done: false,
    };

    addTodo(newTodo);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label htmlFor="text">New todo text</label>
      <div>
        <input type="text" required value={text} onChange={onChange} />
        <button className="btn-add" disabled={isDisabled}>
          Add todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
