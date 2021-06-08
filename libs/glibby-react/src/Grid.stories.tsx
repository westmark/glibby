import React, {
  FunctionComponent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { wrapGrid } from '@glibby/grid-animation';

import { text, number } from '@storybook/addon-knobs';

import { GridItem, makeGrid, upsertStyle } from '@glibby/core';

import './grid.css';
import { Grid, GridProps } from './Grid';
import classNames from 'classnames';
import { closestCorners, DndContext, DragOverEvent } from '@dnd-kit/core';
import { gridCollisionStrategy } from './collisionStrategy';

export default { title: 'Default' };

export const SimpleGrid = () => {
  let id = 1;
  const grid = makeGrid(
    {
      width: 5,
      height: 5,
    },
    [
      { id: id++, layout: { x: 1, y: 1, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 1, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 1, width: 1, height: 1 } },

      { id: id++, layout: { x: 1, y: 2, width: 3, height: 1 } },

      { id: id++, layout: { x: 1, y: 3, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 3, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 3, width: 1, height: 1 } },

      { id: id++, layout: { x: 2, y: 4, width: 2, height: 1 } },
    ]
  );

  const getContent = useCallback((item?: GridItem, className?: string) => {
    if (!item) {
      return null;
    }
    return (
      <GridItemBox
        key={item.id}
        className={classNames(className, item.layout?.className)}
      >
        <div>{item.id}</div>
        <div>
          {item.layout.x}/{item.layout.y}
        </div>
      </GridItemBox>
    );
  }, []);

  return (
    <Container>
      <StyledGrid grid={grid} getContent={getContent} />
    </Container>
  );
};

export const Droppable = () => {
  let id = 1;
  const grid = makeGrid(
    {
      width: 5,
      height: 5,
    },
    [
      { id: id++, layout: { x: 1, y: 1, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 1, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 1, width: 1, height: 1 } },
      { id: id++, layout: { x: 4, y: 1, width: 1, height: 3 } },

      { id: id++, layout: { x: 1, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 2, width: 1, height: 1 } },

      { id: id++, layout: { x: 1, y: 3, width: 3, height: 1 } },

      { id: id++, layout: { x: 1, y: 4, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 4, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 4, width: 1, height: 1 } },

      { id: id++, layout: { x: 2, y: 5, width: 2, height: 1 } },
    ]
  );

  const getContent = useCallback((item?: GridItem, className?: string) => {
    if (!item) {
      return null;
    }
    return (
      <GridItemBox className={classNames(className)}>
        <div>{item.id}</div>
        <div>
          {item.layout.x}/{item.layout.y}
        </div>
      </GridItemBox>
    );
  }, []);

  return (
    <Container>
      <DndContext collisionDetection={gridCollisionStrategy}>
        <StyledGrid grid={grid} getContent={getContent} />
      </DndContext>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 50px;
`;

const StyledGrid = styled(Grid)`
  grid-gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(100, 1fr);
`;

const GridItemBox = styled.div`
  background: #00ff0022;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  font-size: 12px;
  min-width: 50px;
  min-height: 50px;
  width: 100%;
  height: 100%;
`;
