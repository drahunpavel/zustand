import { produce } from "immer";

export const createNamedActionSetter =
  (set: any) => (fn: any, actionName: string) => {
    set(produce(fn), false, actionName);
  };
