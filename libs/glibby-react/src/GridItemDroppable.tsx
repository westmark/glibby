import { GridItem } from '@glibby/core';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { GetContent } from './types';
import { GridItemDraggable } from './GridItemDraggable';

export interface GridItemDroppableProps {
  gridItem: GridItem;
  className?: string;
  getContent?: GetContent;
}

export const GridItemDroppable: FunctionComponent<GridItemDroppableProps> = ({
  gridItem,
  className,
  getContent,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    data: { id: gridItem.id },
    id: gridItem.id.toString(),
  });

  const content = getContent?.(gridItem);

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        'glibby-grid-item-droppable',
        isOver && 'glibby-grid-item-droppable__drag-over',
        gridItem?.layout?.className,
        className
      )}
    >
      {content ? (
        <GridItemDraggable gridItem={gridItem}>{content}</GridItemDraggable>
      ) : null}
    </div>
  );
};
