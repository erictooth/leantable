import { type Config as BaseConfig } from "../../core";
import { type ComponentProps } from "./ComponentProps";

export type Config<State, Actions, Data = unknown> = BaseConfig<
	State,
	Actions,
	Data,
	ComponentProps
>;
