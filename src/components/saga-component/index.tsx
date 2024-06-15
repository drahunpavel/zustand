import React, { useEffect } from "react";
import { useStoreTodos } from "../../store/useStoreTodos";
import { shallow } from "zustand/shallow";
const SERVER_URI = process.env.REACT_APP_SERVER_URI;

const useCustomSaga = () => {
  const { setLoading, setData, setError } = useStoreTodos((state) => ({
    setLoading: state.setLoading,
    setData: state.setData,
    setError: state.setError,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("saga: setLoading");
      try {
        console.log("saga: fetch");
        const response = await fetch(SERVER_URI);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("saga: await response");
        const data = await response.json();
        console.log("saga: setData");
        setData(data);
      } catch (error) {
        console.log("saga: setError");
        setError(error.message);
      } finally {
        console.log("saga: setLoading");
        setLoading(false);
      }
    };

    fetchData();
  }, [setData, setError, setLoading]);
};

const SagaComponent = () => {
  const { todos, error, loading } = useStoreTodos(
    (state) => ({
      todos: state.todos,
      error: state.error,
      loading: state.loading,
    }),
    shallow
  );

  useCustomSaga();

  console.log("render saga component: ", todos, error, loading);

  return (
    <div>
      <p>saga effect</p>
      <hr />
      {loading && <div>loading...</div>}
      {error && <div>error: {error}</div>}
      {!!todos.length && <div>data: {JSON.stringify(todos)}</div>}
    </div>
  );
};

export default SagaComponent;
