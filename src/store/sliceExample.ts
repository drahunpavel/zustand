import { StateCreator } from "zustand";

export interface StoreExample {
  data: string;
}

export const sliceUseStoreExample: StateCreator<
  StoreExample,
  [["zustand/devtools", never]],
  [],
  StoreExample
> = (set, get, store) => ({
  data: "TEST",
});
