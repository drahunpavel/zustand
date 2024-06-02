import React from "react";
import { useStoreFilter } from "../store/useStoreFilter";

const TodoFilter = () => {
  const { filter, setFilter } = useStoreFilter();

  console.log("--render: TodoFilter");

  return (
    <div>
      <button disabled={filter === "all"} onClick={() => setFilter("all")}>
        All
      </button>
      <button
        disabled={filter === "available"}
        onClick={() => setFilter("available")}
      >
        Available
      </button>
      <button
        disabled={filter === "marked"}
        onClick={() => setFilter("marked")}
      >
        Marked
      </button>
    </div>
  );
};

export default TodoFilter;
