import { createContext, useContext, useEffect, useRef, useState } from "react";

type Store = {
	state: any;
	dispatch: (action: any) => void;
};

export const StoreContext = createContext<Store | null>(null);

export const useDispatch = () => {
	const store = useContext(StoreContext);

	if (!store) {
		throw new Error("Store is not defined");
	}

	return store.dispatch;
};

export const useStoreState = (selector: any) => {
	const store = useContext(StoreContext);

	if (!store) {
		throw new Error("Store is not defined");
	}

	const subject = useRef(selector(store.state));
	const [value, setValue] = useState(subject.current.value);
	useEffect(() => {
		const subscription = subject.current.subscribe((nextVal: any) => {
			setValue(nextVal);
		});
		return () => subscription.unsubscribe();
	}, []);
	return value;
};
