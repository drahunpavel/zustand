import { Todo } from "../types";
import { StateCreator } from "zustand";
import { createNamedActionSetter } from "./utils";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: null;
  info: {
    total: number;
    active: number;
    done: number;
    left: string;
  };
};

type TodosActions = {
  updateInfo: () => void;
  addTodo: (newTodo: Todo) => void;
  updateTodo: (id: string | number) => void;
  removeTodo: (id: string | number) => void;
  completeActiveTodos: () => void;
  removeCompletedTodos: () => void;
  fetchTodos: () => Promise<void>;
  reset: () => void;
};

export enum TodosActionTypes {
  UpdateInfo = "Todos: UpdateInfo",
  UpdateTodo = "Todos: UpdateTodo",
  Add = "Todos: Add",
  RemoveTodo = "Todos: RemoveTodo",
  CompleteActiveTodos = "Todos: CompleteActiveTodos",
  RemoveCompletedTodos = "Todos: RemoveCompletedTodos",
  Fetch = "Todos: Fetch",
  Loading = "Todos: Loading",
  SetTodos = "Todos: SetTodos",
  SetError = "Todos: SetError",
  Reset = "Todos: Reset",
}

export type TodosStoreState = TodosState & { actions: TodosActions };

const initialStateTodos = {
  todos: [],
  loading: false,
  error: null,
  info: { total: 0, active: 0, done: 0, left: "0%" },
} as TodosState;

export const useStoreTodos: StateCreator<
  TodosStoreState,
  [["zustand/devtools", never]],
  [],
  TodosStoreState
> = (set, get) => {
  const actionSet = createNamedActionSetter(set);

  return {
    ...initialStateTodos,
    actions: {
      updateInfo: () => {
        actionSet((state: TodosState) => {
          const todos = get().todos;
          state.info.total = todos.length;
          state.info.active = todos.filter((t) => !t.done).length;
          state.info.done = state.info.total - state.info.active;
          state.info.left =
            state.info.total > 0
              ? Math.round((state.info.active / state.info.total) * 100) + "%"
              : "0%";
        }, TodosActionTypes.UpdateInfo);
      },
      addTodo: (newTodo: Todo) => {
        actionSet((state: TodosState) => {
          state.todos.push(newTodo);
        }, TodosActionTypes.Add);
        get().actions.updateInfo();
      },
      updateTodo: (id: string | number) => {
        actionSet((state: TodosState) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) todo.done = !todo.done;
        }, TodosActionTypes.UpdateTodo);
        get().actions.updateInfo();
      },
      removeTodo: (id: string | number) => {
        actionSet((state: TodosState) => {
          state.todos = state.todos.filter((t) => t.id !== id);
        }, TodosActionTypes.RemoveTodo);
        get().actions.updateInfo();
      },
      completeActiveTodos: () => {
        actionSet((state: TodosState) => {
          state.todos.forEach((t) => {
            if (!t.done) t.done = true;
          });
        }, TodosActionTypes.CompleteActiveTodos);
        get().actions.updateInfo();
      },
      removeCompletedTodos: () => {
        actionSet((state: TodosState) => {
          state.todos = state.todos.filter((t) => !t.done);
        }, TodosActionTypes.RemoveCompletedTodos);
        get().actions.updateInfo();
      },
      fetchTodos: async () => {
        actionSet((state: TodosState) => {
          state.loading = true;
        }, TodosActionTypes.Loading);
        try {
          const response = await fetch(SERVER_URI);
          if (!response.ok) throw response;
          const todos = await response.json();
          actionSet((state: TodosState) => {
            state.todos = todos;
          }, TodosActionTypes.SetTodos);
          get().actions.updateInfo();
        } catch (e) {
          let error = e;
          if (e.status === 400) {
            error = await e.json();
          }
          actionSet((state: TodosState) => {
            state.error = error;
          }, TodosActionTypes.SetError);
        } finally {
          actionSet((state: TodosState) => {
            state.loading = false;
          }, TodosActionTypes.Loading);
        }
      },
      reset: () => {
        set(initialStateTodos);
      },
    },
  };
};
