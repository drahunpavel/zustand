import { shallow } from "zustand/shallow";
import useStore from "..";

export const useTodosStore = () => {
  return useStore(
    (state) => ({
      todos: state.todos,
      completeActiveTodos: state.actions.completeActiveTodos,
      removeCompletedTodos: state.actions.removeCompletedTodos,
    }),
    shallow
  );
};
