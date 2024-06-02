import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Todo } from "../types";
import { createWithEqualityFn } from "zustand/traditional";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: null;
  info: {
    total: number;
    available: number;
    marked: number;
    free: string;
  };
};

type TodosActions = {
  updateInfo: () => void;
  addTodo: (newTodo: Todo) => void;
  updateTodo: (id: string) => void;
  removeTodo: (id: string) => void;
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

export type TodosStoreState = TodosState & TodosActions;

const initialStateTodos = {
  todos: [],
  loading: false,
  error: null,
  info: { total: 0, available: 0, marked: 0, free: "0%" },
} as TodosState;

export const useStoreTodos = createWithEqualityFn<TodosStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialStateTodos,
        updateInfo: () => {
          const todos = get().todos;
          const { length: total } = todos;
          const available = todos.filter((t) => !t.done).length;
          const marked = total - available;
          const free = Math.round((available / total) * 100) + "%";
          set(
            { info: { total, available, marked, free } },
            false,
            TodosActionTypes.UpdateInfo
          );
        },
        addTodo: (newTodo: Todo) => {
          const todos = [...get().todos, newTodo];
          set({ todos }, false, TodosActionTypes.Add);
          get().updateInfo();
        },
        updateTodo: (id: string) => {
          set(
            {
              todos: get().todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
              ),
            },
            false,
            TodosActionTypes.UpdateTodo
          );
          get().updateInfo();
        },
        removeTodo: (id: string) => {
          const todos = get().todos.filter((t) => t.id !== id);
          set({ todos }, false, TodosActionTypes.RemoveTodo);
          get().updateInfo();
        },
        completeActiveTodos: () => {
          set(
            {
              todos: get().todos.map((todo) =>
                !todo.done ? { ...todo, done: true } : todo
              ),
            },
            false,
            TodosActionTypes.CompleteActiveTodos
          );
          get().updateInfo();
        },
        removeCompletedTodos: () => {
          set(
            {
              todos: get().todos.filter((todo) => !todo.done),
            },
            false,
            TodosActionTypes.RemoveCompletedTodos
          );
          get().updateInfo();
        },
        fetchTodos: async () => {
          set({ loading: true }, false, TodosActionTypes.Loading);
          try {
            const response = await fetch(SERVER_URI);
            if (!response.ok) throw response;
            const todos = await response.json();
            set({ todos }, false, TodosActionTypes.SetTodos);
            get().updateInfo();
          } catch (e) {
            const error = await e.json();
            set({ error }, false, TodosActionTypes.SetError);
          } finally {
            set({ loading: false }, false, TodosActionTypes.Loading);
          }
        },
        reset: () => {
          set(initialStateTodos);
        },
      }),
      { name: "TodosStore", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "TodosStore" }
  )
);
