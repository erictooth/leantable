import { BehaviorSubject } from "rxjs";

export const createStoreFromReducers = <T extends Record<string, any>>(
	reducers: T
) => {
	const state = Object.keys(reducers).reduce((state, reducerKey) => {
		state[reducerKey] = new BehaviorSubject(
			reducers[reducerKey](undefined, { type: "INIT" })
		);
		return state;
	}, {} as Record<string, any>) as {
		[Property in keyof T]: BehaviorSubject<ReturnType<T[Property]>>;
	};
	const dispatch = (action: any) => {
		for (const key in state) {
			const curr = state[key].value;
			const next = reducers[key](curr, action);
			if (curr !== next) {
				state[key].next(next);
			}
		}
	};
	return { state, dispatch };
};
