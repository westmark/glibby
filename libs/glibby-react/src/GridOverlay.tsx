import { GridLayout } from '@glibby/core';
import React, { FunctionComponent, useMemo } from 'react';
import { GridDropCell } from './GridDropCell';

interface GridOverlayProps {
  boundingBox: GridLayout;
}

export const GridOverlay: FunctionComponent<GridOverlayProps> = ({
  boundingBox,
}) => {
  const children = useMemo(() => {
    const children: Array<JSX.Element> = [];
    for (let x = 1; x < boundingBox.width; x += 1) {
      for (let y = 1; y < boundingBox.height; y += 1) {
        children.push(<GridDropCell x={x} y={y} key={`${x},${y}`} />);
      }
    }
    return children;
  }, [boundingBox]);
  return (
    <div className="glibby-grid-container glibby-grid-container-overlay">
      {children}
    </div>
  );
};
