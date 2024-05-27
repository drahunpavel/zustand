import React from "react";
import { shallow } from "zustand/shallow";
import useStore from "../store";

const TodoInfo = () => {
  const { todos, info } = useStore(
    ({ todos, info }) => ({
      todos,
      info,
    }),
    shallow
  );

  //   useEffect(() => {
  //     updateInfo();
  //   }, [todos]);

  console.log("--render: TodoInfo");

  if (!info || !todos.length) return null;

  return (
    <div className="todo-info">
      {["Total", "Active", "Done", "Free"].map((k) => (
        <span key={k}>
          {k}: {info[k.toLowerCase()]}
        </span>
      ))}
    </div>
  );
};

export default TodoInfo;
