import { createStoreFromReducers } from "./createStoreFromReducers";

const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
	fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);

const identityProps = (props: unknown) => props;

export const createTable = (plugins: any) => {
	//@ts-ignore
	const composed = compose(...plugins)({
		modifyColumns: identityProps,
		reducers: {},
		getTableProps: identityProps,
		getRowProps: identityProps,
		getBodyProps: identityProps,
	}) as any;
	const store = createStoreFromReducers(composed.reducers);
	return {
		store,
		plugins: composed,
	};
};
