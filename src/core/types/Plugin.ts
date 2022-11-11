import { type Config } from "./Config";
import { type ComponentProps as DefaultComponentProps } from "./ComponentProps";

export type Plugin<
	AdditionalState = unknown,
	AdditionalActions = unknown,
	ComponentProps extends DefaultComponentProps = DefaultComponentProps,
	Data = unknown
> = <BaseState, BaseActions>(
	config: Config<BaseState, BaseActions, Data, ComponentProps>
) => Config<
	BaseState & AdditionalState,
	BaseActions & AdditionalActions,
	Data,
	ComponentProps
>;
