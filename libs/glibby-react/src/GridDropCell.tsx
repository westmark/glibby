import { GridItem } from '@glibby/core';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { GetContent } from './types';
import { GridItemDraggable } from './GridItemDraggable';

export interface GridDropCellProps {
  x: number;
  y: number;
}

export const GridDropCell: FunctionComponent<GridDropCellProps> = ({
  x,
  y,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    data: { layout: { x, y, width: 1, height: 1 } },
    id: `${x},${y}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        'glibby-grid-drop-cell',
        isOver && 'glibby-grid-drop-cell__drag-over'
      )}
      style={{ gridArea: `${y} / ${x} / span 1 / span 1` }}
    ></div>
  );
};
