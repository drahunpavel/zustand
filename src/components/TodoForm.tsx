import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import useStore from "../store";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const addTodo = useStore((state) => state.actions.addTodo);

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
        <input
          type="text"
          required
          value={text}
          onChange={onChange}
          style={
            !isDisabled ? { borderBottom: "2px solid var(--success)" } : {}
          }
        />
        <button className="btn-add" disabled={isDisabled}>
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
