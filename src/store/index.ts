import { devtools } from "zustand/middleware";
import { TodosStoreState, useStoreTodos } from "./todos";
import { StoreExample, useStoreExample } from "./example";
import { createWithEqualityFn } from "zustand/traditional";

// Slices pattern

const useStore = createWithEqualityFn<TodosStoreState & StoreExample>()(
  devtools(
    (set, get, store) => ({
      ...useStoreTodos(set, get, store),
      ...useStoreExample(set, get, store),
    }),
    { name: "Zustand App Store" }
  )
);

export default useStore;
