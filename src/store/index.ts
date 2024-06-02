import { devtools } from "zustand/middleware";
import { TodosStoreState, sliceUseStoreTodos } from "./sliceTodos";
import { StoreExample, sliceUseStoreExample } from "./sliceExample";
import { createWithEqualityFn } from "zustand/traditional";

// Slices pattern

const useStore = createWithEqualityFn<TodosStoreState & StoreExample>()(
  devtools(
    (set, get, store) => ({
      ...sliceUseStoreTodos(set, get, store),
      ...sliceUseStoreExample(set, get, store),
    }),
    { name: "Zustand App Store" }
  )
);

export default useStore;
