import React from "react";
import { FilterValues, useStoreFilter } from "../store/useStoreFilter";

const TodoFilter = () => {
  const { filter, setFilter } = useStoreFilter();

  console.log("--render: TodoFilter");

  return (
    <div>
      <button
        disabled={filter === FilterValues.All}
        onClick={() => setFilter(FilterValues.All)}
      >
        All
      </button>
      <button
        disabled={filter === FilterValues.Available}
        onClick={() => setFilter(FilterValues.Available)}
      >
        Available
      </button>
      <button
        disabled={filter === FilterValues.Marked}
        onClick={() => setFilter(FilterValues.Marked)}
      >
        Marked
      </button>
    </div>
  );
};

export default TodoFilter;
