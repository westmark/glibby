import { useDraggable } from '@dnd-kit/core';
import React, { FunctionComponent } from 'react';
import { Corner } from './types';

interface GridItemResizerProps {
  id: string | number;
  corner: Corner;
}

export const GridItemResizer: FunctionComponent<GridItemResizerProps> = ({
  id,
  corner,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    data: {
      id,
      corner,
    },
    id: corner,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`glibby-grid-item-wrapper__resizer glibby-grid-item-wrapper__resizer--${corner}`}
    ></div>
  );
};
