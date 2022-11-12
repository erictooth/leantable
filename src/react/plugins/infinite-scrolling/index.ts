import { type Plugin } from "../../types/Plugin";
import { watchForLastRow } from "../../../plugins/infinite-scrolling";
import { useLayoutEffect, useRef } from "react";
export const infiniteScrolling =
	(onScrolledToBottom: () => void, padding = 0): Plugin =>
	(config) => {
		return {
			...config,
			getBodyProps: (props) => {
				const bodyElRef = useRef<HTMLTableSectionElement>(null);
				useLayoutEffect(() => {
					if (!bodyElRef.current) {
						return;
					}
					return watchForLastRow(
						bodyElRef.current,
						onScrolledToBottom,
						padding
					);
				});
				return {
					...props,
					ref: bodyElRef,
				};
			},
		};
	};
