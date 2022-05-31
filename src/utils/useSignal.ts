import { useEffect, useState } from "react";
import { type Accessor, createEffect, untrack, createRoot } from "solid-js";

export const useSignal = <T>(signal: Accessor<T>) => {
  const [val, setVal] = useState<T>(untrack(() => signal()));
  useEffect(() => {
    return createRoot((dispose) => {
      createEffect(() => {
        setVal(signal());
      });

      return dispose;
    });
  }, []);
  return val;
};
