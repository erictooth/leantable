export type VirtualizedState = {
	windowStart: number;
	windowEnd: number;
};

export type VirtualizedActions = {
	type: "VIRTUAL_SCROLL";
	x: number;
	y: number;
};
