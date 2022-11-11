import { BehaviorSubject } from "rxjs";

export type Store<State, Actions> = {
	state: { [Property in keyof State]: BehaviorSubject<State[Property]> };
	dispatch: (action: Actions) => void;
};
