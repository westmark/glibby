import { useDraggable } from '@dnd-kit/core';
import { GridItem } from '@glibby/core';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { GetContent } from './types';

interface GridItemDraggableProps {
  gridItem: GridItem;
  className?: string;
}

export const GridItemDraggable: FunctionComponent<GridItemDraggableProps> = ({
  gridItem,
  className,
  children,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    data: {
      id: gridItem.id,
    },
    id: gridItem.id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={classNames(
        'glibby-grid-item-draggable',
        isDragging && 'glibby-grid-item-draggable__dragging',
        className
      )}
    >
      <div className="glibby-grid-item-draggable__content">{children}</div>
    </div>
  );
};
