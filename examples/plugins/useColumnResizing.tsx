import { useEffect, useRef, type ReactNode } from "react";
import {
	animationFrameScheduler,
	concat,
	filter,
	fromEvent,
	map,
	of,
	switchMap,
	takeUntil,
	throttleTime,
} from "rxjs";
import { useSignal, useComputed } from "@preact/signals-react";
import clsx from "clsx";
import { useConfigContext, type Config } from "leantable";

const COLUMN_DEFAULT_WIDTH = "max-content";

export const useColumnResizing = (
	initialState?: [colId: string, width: string][],
) => {
	const columnSizes = useSignal(new Map<string, string>(initialState));
	return {
		plugin: (config: Config) => {
			return {
				...config,
				Table: function Table(props) {
					const finalConfig = useConfigContext();
					const gridTemplateColumns = useComputed(() =>
						finalConfig.columns.value
							.map(
								(column) => columnSizes.value.get(column.id) || "max-content",
							)
							.join(" "),
					).value;
					return (
						<config.Table
							{...props}
							style={{
								...props.style,
								gridTemplateColumns,
							}}
						/>
					);
				},
				HeaderCell: (props) => {
					const dragRef = useRef<HTMLDivElement>(null);

					const isDragging = useSignal(false);

					useEffect(() => {
						const el = dragRef.current;
						if (!el) {
							return;
						}

						const nextWidth$ = createDragOffset(el, el.closest("th")!).pipe(
							map(({ startRect, xOffset }) => {
								return startRect.width + xOffset;
							}),
						);
						const isDragging$ = createIsDragging(el);

						const doubleClicks$ = createElDoubleClicks(el);

						const sub = nextWidth$
							.pipe(filter((width) => width > 50))
							.subscribe((offset) => {
								const next = new Map(columnSizes.value);
								next.set(props.column.id, `${offset}px`);
								columnSizes.value = next;
							});

						const sub2 = isDragging$.subscribe((dragging) => {
							isDragging.value = dragging;
						});

						const sub3 = doubleClicks$.subscribe((doubleClicked) => {
							const next = new Map(columnSizes.value);
							next.set(props.column.id, COLUMN_DEFAULT_WIDTH);
							columnSizes.value = next;
						});

						return () => {
							sub.unsubscribe();
							sub2.unsubscribe();
							sub3.unsubscribe();
						};
					}, []);
					return (
						<config.HeaderCell
							{...props}
							renderHeaderCell={() => {
								return (
									<>
										{wrapStringNode(props.renderHeaderCell())}
										<div
											role="presentation"
											className={clsx("lt-col-drag", {
												"lt-col-drag--active": isDragging.value,
											})}
											ref={dragRef}
										/>
									</>
								);
							}}
						/>
					);
				},
				Cell: (props) => {
					return (
						<config.Cell
							{...props}
							renderCell={(rowIndex, rowId) =>
								wrapStringNode(props.renderCell(rowIndex, rowId))
							}
						/>
					);
				},
			} as const satisfies Config;
		},
		state: columnSizes,
	} as const;
};

const createDragOffset = (el: HTMLElement, sizeRef: HTMLElement) =>
	fromEvent(el, "mousedown").pipe(
		switchMap((startEvent) => {
			startEvent.preventDefault();
			const startRect = sizeRef.getBoundingClientRect();
			return fromEvent(document, "mousemove").pipe(
				map((moveEvent) => {
					moveEvent.preventDefault();
					const xOffset =
						(moveEvent as MouseEvent).clientX -
						(startEvent as MouseEvent).clientX;
					const yOffset =
						(moveEvent as MouseEvent).clientY -
						(startEvent as MouseEvent).clientY;
					return {
						startRect,
						xOffset,
						yOffset,
					};
				}),
				takeUntil(fromEvent(document, "mouseup")),
			);
		}),
		throttleTime(0, animationFrameScheduler),
	);

const createIsDragging = (el: HTMLElement) =>
	fromEvent(el, "mousedown").pipe(
		switchMap(() =>
			concat(of(true), fromEvent(document, "mouseup").pipe(map(() => false))),
		),
	);

const createElDoubleClicks = (el: HTMLElement) => fromEvent(el, "dblclick");

export const wrapStringNode = (node: ReactNode): ReactNode => {
	if (typeof node === "string") {
		return (
			<span
				style={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{node}
			</span>
		);
	}

	return node;
};
