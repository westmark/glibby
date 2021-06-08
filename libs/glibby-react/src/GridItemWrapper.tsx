import { GridItem } from '@glibby/core';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { GetContent } from './types';
import { GridItemDraggable } from './GridItemDraggable';

export interface GridItemWrapperProps {
  gridItem: GridItem;
  className?: string;
  getContent?: GetContent;
}

export const GridItemWrapper: FunctionComponent<GridItemWrapperProps> = ({
  gridItem,
  className,
  getContent,
}) => {
  const content = getContent?.(gridItem);

  return (
    <div
      className={classNames(
        'glibby-grid-item-wrapper',
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
