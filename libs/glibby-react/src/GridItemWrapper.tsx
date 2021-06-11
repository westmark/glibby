import { GridItem } from '@glibby/core';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { GetContent } from './types';
import { GridItemDraggable } from './GridItemDraggable';
import { GridItemResizer } from './GridItemResizer';

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
      <div className="glibby-grid-item-wrapper__inner">
        {content ? (
          <GridItemDraggable gridItem={gridItem}>{content}</GridItemDraggable>
        ) : null}
        {gridItem.resizable ? (
          <>
            <GridItemResizer corner="nw" id={gridItem.id} />
            <GridItemResizer corner="ne" id={gridItem.id} />
            <GridItemResizer corner="sw" id={gridItem.id} />
            <GridItemResizer corner="se" id={gridItem.id} />
          </>
        ) : null}
      </div>
    </div>
  );
};
