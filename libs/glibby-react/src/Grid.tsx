import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  displace,
  Grid as GridType,
  GridItem,
  upsertStyle,
} from '@glibby/core';
import update from 'immutability-helper';
import { GridItemDroppable, GridItemDroppableProps } from './GridItemDroppable';
import classNames from 'classnames';
import {
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useDndMonitor,
} from '@dnd-kit/core';
import { wrapGrid } from '@glibby/grid-animation';

export interface GridProps extends Pick<GridItemDroppableProps, 'getContent'> {
  grid: GridType;
  className?: string;
}

export const Grid: FunctionComponent<GridProps> = ({
  grid: initialGrid,
  getContent,
  className,
}) => {
  const [grid, setGrid] = useState(initialGrid);
  const [activeId, setActiveId] = useState();

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const active = grid.data.items.find(
        (item) => item.id === event.active.data?.current?.id
      );
      const over = grid.data.items.find(
        (item) => item.id === event.over?.data?.current?.id
      );

      if (active && over && active.id !== over.id) {
        const updatedGrid = grid.set(
          {
            x: over.layout.x,
            y: over.layout.y,
            width: active.layout.width,
            height: active.layout.height,
          },
          active
        );

        setGrid(updatedGrid);
      }
    },
    [grid]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.data.current?.id);
  }, []);

  const handleDragEnd = useCallback(() => setActiveId(undefined), []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
  });

  useEffect(() => {
    upsertStyle(grid);
  }, [grid]);

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      wrapGrid(gridRef.current, {
        easing: 'backOut',
        stagger: 10,
        duration: 500,
      });
    }
  }, []);

  return (
    <>
      <div
        className={classNames(className, 'glibby-grid-container')}
        ref={gridRef}
      >
        {grid?.data.items.map((item) => (
          <GridItemDroppable
            key={item.id}
            gridItem={item}
            getContent={getContent}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId && getContent
          ? getContent(grid?.data.items.find((i) => i.id === activeId))
          : null}
      </DragOverlay>
    </>
  );
};
