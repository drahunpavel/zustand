import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { TodosStoreState, useStoreTodos } from "./todos";
import { StoreExample, useStoreExample } from "./example";

const useStore = create<TodosStoreState & StoreExample>()(
  devtools(
    (set, get, store) => ({
      ...useStoreTodos(set, get, store),
      ...useStoreExample(set, get, store),
    }),
    { name: "Zustand App Store" }
  )
);

export default useStore;
