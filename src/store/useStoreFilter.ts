import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type FilterStoreState = {
  filter: string;
  setFilter: (value: string) => void;
};

export const useStoreFilter = create<FilterStoreState>()(
  devtools(
    persist(
      (set) => ({
        filter: "all",
        setFilter: (value) =>
          set({ filter: value }, false, "Filter: SetFilter"),
      }),
      { name: "FilterStore", storage: createJSONStorage(() => sessionStorage) }
    ),
    { name: "FilterStore" }
  )
);

//* Reading/writing state outside of components
//const filter = useStoreFilter.getState().filter;
//useStoreFilter.setState({ filter: "all" });
