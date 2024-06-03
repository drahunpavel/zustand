import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export enum FilterValues {
  All = "All",
  Available = "Available",
  Marked = "Marked",
}

type FilterStoreState = {
  filter: FilterValues;
  setFilter: (value: FilterValues) => void;
};

export const useStoreFilter = create<FilterStoreState>()(
  devtools(
    persist(
      (set) => ({
        filter: FilterValues.All,
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

//* Event change subscription
// const unsubscribe = useStoreFilter.subscribe((state) => {
//   console.log(`Filter changed to: ${state.filter}`);
// });
