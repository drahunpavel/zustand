import React from "react";
import { shallow } from "zustand/shallow";
import { useStoreTodos } from "../store/useStoreTodos";

const Boundary = ({ children }) => {
  const { loading, error } = useStoreTodos(
    ({ loading, error }) => ({ loading, error }),
    shallow
  );

  console.log("--render: Boundary");

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return <>{children}</>;
};

export default Boundary;
