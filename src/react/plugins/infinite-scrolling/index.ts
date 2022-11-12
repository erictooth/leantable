import { type Plugin } from "../../types/Plugin";
import { watchForLastRow } from "../../../plugins/infinite-scrolling";
import { useEffect, useRef } from "react";
export const infiniteScrolling =
	(onScrolledToBottom: () => void, padding = 0): Plugin =>
	(config) => {
		return {
			...config,
			getBodyProps: (props) => {
				const bodyElRef = useRef<HTMLTableSectionElement>(null);
				useEffect(() => {
					if (!bodyElRef.current) {
						return;
					}
					watchForLastRow(bodyElRef.current, onScrolledToBottom, padding);
				}, []);
				return {
					...props,
					ref: bodyElRef,
				};
			},
		};
	};
