import { type Plugin as BasePlugin } from "../../core/types/Plugin";
import { type ComponentProps } from "./ComponentProps";
export type Plugin<
	AdditionalState = unknown,
	AdditionalActions = unknown,
	Data = unknown
> = BasePlugin<AdditionalState, AdditionalActions, ComponentProps, Data>;
