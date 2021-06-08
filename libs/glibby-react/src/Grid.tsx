import {
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useDndMonitor,
} from '@dnd-kit/core';
import { Grid as GridType, upsertStyle } from '@glibby/core';
import { wrapGrid } from '@glibby/grid-animation';
import classNames from 'classnames';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { GridItemWrapper, GridItemWrapperProps } from './GridItemWrapper';
import { GridOverlay } from './GridOverlay';

export interface GridProps extends Pick<GridItemWrapperProps, 'getContent'> {
  grid: GridType;
  className?: string;
}

export const Grid: FunctionComponent<GridProps> = ({
  grid: initialGrid,
  getContent,
  className,
}) => {
  const [grid, setGrid] = useState(upsertStyle(initialGrid));
  const [activeId, setActiveId] = useState();

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setGrid((old) => {
      const active = old.data.items.find(
        (item) => item.id === event.active.data?.current?.id
      );
      const over = event.over?.data.current;

      if (active && over) {
        const updatedGrid = old.set(
          {
            x: over.layout.x,
            y: over.layout.y,
            width: active.layout.width,
            height: active.layout.height,
          },
          active
        );

        return upsertStyle(updatedGrid);
      }
      return old;
    });
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.data.current?.id);
  }, []);

  const handleDragEnd = useCallback(() => setActiveId(undefined), []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
  });

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

  const boundingBox = useMemo(() => grid.boundingBox(), [grid]);

  return (
    <div className={classNames('glibby-grid-outer-wrapper', className)}>
      <div className="glibby-grid-container" ref={gridRef}>
        {grid?.data.items.map((item) => (
          <GridItemWrapper
            key={item.id}
            gridItem={item}
            getContent={getContent}
          />
        ))}
      </div>
      {activeId ? <GridOverlay boundingBox={boundingBox} /> : null}
      <DragOverlay>
        {activeId && getContent ? (
          <div className="glibby-grid-drag-overlay">
            {getContent(grid?.data.items.find((i) => i.id === activeId))}
          </div>
        ) : null}
      </DragOverlay>
    </div>
  );
};
