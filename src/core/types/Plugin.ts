import type { TableRenderer } from "./TableRenderer";

export type Plugin<AdditionalState = unknown, AdditionalActions = unknown> = <
	BaseState,
	BaseActions
>(
	baseRenderer: TableRenderer<BaseState, BaseActions>
) => TableRenderer<
	BaseState & AdditionalState,
	BaseActions & AdditionalActions
>;
