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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    data: {
      id: gridItem.id,
    },
    id: gridItem.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

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
      {children}
    </div>
  );
};