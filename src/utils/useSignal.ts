import { useEffect, useState } from "react";
import { type Accessor, createEffect, untrack } from "solid-js";

export const useSignal = <T>(signal: Accessor<T>) => {
  const [val, setVal] = useState<T>(untrack(() => signal()));
  useEffect(() => {
    createEffect(() => {
      setVal(signal());
    });
  }, []);
  return val;
};
