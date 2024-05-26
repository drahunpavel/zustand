import { Todo } from "../types";
import { StateCreator } from "zustand";

const SERVER_URI = process.env.SERVER_URI;

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

export type TodosStoreState = TodosState & TodosActions;

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
> = (set, get) => ({
  ...initialStateTodos,
  updateInfo() {
    const todos = get().todos;
    const total = todos.length;
    const active = todos.filter((t) => !t.done).length;
    const done = total - active;
    const left = total > 0 ? Math.round((active / total) * 100) + "%" : "0%";
    set({ info: { total, active, done, left } });
  },
  addTodo: (newTodo) => {
    const todos = [...get().todos, newTodo];
    set({ todos });
    get().updateInfo();
  },
  updateTodo: (id) => {
    const todos = get().todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    set({ todos });
    get().updateInfo();
  },
  removeTodo: (id) => {
    const todos = get().todos.filter((t) => t.id !== id);
    set({ todos });
    get().updateInfo();
  },
  completeActiveTodos: () => {
    const todos = get().todos.map((t) => (t.done ? t : { ...t, done: true }));
    set({ todos });
    get().updateInfo();
  },
  removeCompletedTodos: () => {
    const todos = get().todos.filter((t) => !t.done);
    set({ todos });
    get().updateInfo();
  },
  fetchTodos: async () => {
    set({ loading: true });
    try {
      const response = await fetch(SERVER_URI);
      if (!response.ok) throw response;
      const todos = await response.json();
      set({ todos });
      get().updateInfo();
    } catch (e) {
      let error = e;
      if (e.status === 400) {
        error = await e.json();
      }
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
  reset: () => {
    set(initialStateTodos);
  },
});
