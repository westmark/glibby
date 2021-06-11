import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragStartEvent,
} from '@dnd-kit/core';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { gridCollisionStrategy } from './collisionStrategy';

export const GridDndContext: FunctionComponent = ({ children }) => {
  const [
    collisionStrategy,
    setCollisionStrategy,
  ] = useState<CollisionDetection>(() => gridCollisionStrategy);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setCollisionStrategy(() =>
      event.active.data.current?.corner ? closestCenter : gridCollisionStrategy
    );
  }, []);

  return (
    <DndContext
      onDragStart={handleDragStart}
      collisionDetection={collisionStrategy}
    >
      {children}
    </DndContext>
  );
};
