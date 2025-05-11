import { createContext, useContext, useEffect, useRef } from "react";
import { type Config, useConfigContext } from "leantable";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import type { ReadonlySignal } from "@preact/signals-react";
import clsx from "clsx";

export const useVirtualizedRendering = (opts: {
  estimateSize: () => number;
  overscan?: number;
}) => {
  const scrollElementRef = useRef<Element>(null);

  const scrollElement$ = useSignal(scrollElementRef.current);

  useEffect(() => {
    scrollElement$.value = scrollElementRef.current;
  }, []);

  const plugin = (config: Config) => {
    return {
      ...config,
      Body: function VirtualizedBody(props) {
        const { renderedRows, ...rest } = props;
        const virtualItems = useContext(virtualItemsContext)!;
        const virtualRenderedRows = useComputed(() =>
          virtualItems.value.map((item) => renderedRows.value.at(item.index)!)
        );
        return <config.Body {...rest} renderedRows={virtualRenderedRows} />;
      },
      Row: function Row(props) {
        const rowRef = useRef<HTMLTableRowElement>(null);
        const virtualItems = useContext(virtualItemsContext)!;
        const transform = useComputed(() => {
          const renderedIndex = virtualItems.value.findIndex(
            (item) => item.index === props.renderedRow[0]
          );
          const virtualRow = virtualItems.value[renderedIndex];
          if (!virtualRow) {
            return "";
          }
          return `translateY(${virtualRow.start - renderedIndex * virtualRow.size}px)`;
        });
        useSignalEffect(() => {
          if (!rowRef.current) {
            return;
          }
          rowRef.current.style = `transform: ${transform.value}`;
        });
        const isEvenRow = props.renderedRow[0] % 2 === 0;
        return (
          <config.Row
            {...props}
            aria-rowindex={props.renderedRow[0] + 1}
            className={clsx(props.className, {
              "lt-row--odd": !isEvenRow,
              "lt-row--even": isEvenRow,
            })}
            ref={rowRef}
          />
        );
      },
      Table: (props) => {
        const finalConfig = useConfigContext();
        const scrollElement = scrollElement$.value;
        const rowVirtualizer = useVirtualizer({
          count: finalConfig.renderedRows.value.length,
          getScrollElement: () => scrollElement,
          estimateSize: opts.estimateSize,
          overscan: opts.overscan,
          getItemKey: (index) => config.renderedRows.value.at(index)![1],
          useAnimationFrameWithResizeObserver: true,
          // Prevents an initial flicker when the scroll el ref is initially null
          initialRect: new DOMRect(undefined, undefined, 1, 1),
        });

        const virtualItems = rowVirtualizer.getVirtualItems();

        const virtualItems$ = useSignal(virtualItems);

        useEffect(() => {
          virtualItems$.value = virtualItems;
        }, [virtualItems]);

        return (
          <virtualItemsContext.Provider value={virtualItems$}>
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
            >
              <config.Table
                {...props}
                aria-rowcount={config.renderedRows.value.length}
                style={{
                  ...props.style,
                  height: "100%",
                }}
              />
            </div>
          </virtualItemsContext.Provider>
        );
      },
    } as const satisfies Config;
  };

  return {
    scrollElementRef,
    plugin,
  } as const;
};

const virtualItemsContext = createContext<ReadonlySignal<VirtualItem[]> | null>(
  null
);
