import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { wrapGrid } from '@glibby/grid-animation';

import { text, number } from '@storybook/addon-knobs';
import { makeGrid } from './grid';
import { upsertStyle } from './styles';

export default { title: 'Default' };

export const RemoveItem = () => {
  const gridRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
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

      { id: id++, layout: { x: 3, y: 4, width: 2, height: 1 } },
    ]
  );

  const [gridState, setGridState] = useState(grid);

  return (
    <div>
      <button onClick={() => setGridState((old) => old.remove(4))}>
        Remove
      </button>
      <Container>
        <GridContainer ref={gridRef}>
          {gridState.data.items.map((item) => (
            <Item
              key={(item.id as string).toString()}
              style={{
                gridColumn: `${item.layout.x} / span ${item.layout.width}`,
                gridRow: `${item.layout.y} / span ${item.layout.height}`,
              }}
            >
              {item.id as string}
            </Item>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

export const RemoveItemComplex = () => {
  const gridRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
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

      { id: id++, layout: { x: 1, y: 2, width: 3, height: 1 } },

      { id: id++, layout: { x: 1, y: 3, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 3, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 3, width: 1, height: 1 } },

      { id: id++, layout: { x: 2, y: 4, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 4, width: 2, height: 1 } },

      { id: id++, layout: { x: 2, y: 5, width: 2, height: 1 } },
      { id: id++, layout: { x: 4, y: 5, width: 2, height: 1 } },
    ]
  );

  const [gridState, setGridState] = useState(grid);

  return (
    <div>
      <button onClick={() => setGridState((old) => old.remove(5))}>
        Remove 5
      </button>
      <Container>
        <GridContainer ref={gridRef}>
          {gridState.data.items.map((item) => (
            <Item
              key={(item.id as string).toString()}
              style={{
                gridColumn: `${item.layout.x} / span ${item.layout.width}`,
                gridRow: `${item.layout.y} / span ${item.layout.height}`,
              }}
            >
              {item.id as string}
            </Item>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

export const InsertItem = () => {
  const gridRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
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

      { id: id++, layout: { x: 1, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 2, width: 1, height: 1 } },

      { id: id++, layout: { x: 3, y: 3, width: 2, height: 1 } },
    ]
  );

  const [gridState, setGridState] = useState(grid);

  return (
    <div>
      <button
        onClick={() =>
          setGridState((old) =>
            old.set(
              { height: 1, width: 2, x: 2, y: 1 },
              {
                id: 1000,
                layout: { height: 1, width: 1, x: 1, y: 1 },
              }
            )
          )
        }
      >
        Insert
      </button>
      <Container>
        <GridContainer ref={gridRef}>
          {gridState.data.items.map((item) => (
            <Item
              key={(item.id as string).toString()}
              style={{
                gridColumn: `${item.layout.x} / span ${item.layout.width}`,
                gridRow: `${item.layout.y} / span ${item.layout.height}`,
              }}
            >
              {item.id as string}
            </Item>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

export const WithStyles = () => {
  const gridRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
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

      { id: id++, layout: { x: 3, y: 4, width: 2, height: 1 } },
    ]
  );

  const [gridState, setGridState] = useState(grid);

  upsertStyle(gridState);

  return (
    <div>
      <Container>
        <GridContainer ref={gridRef}>
          {gridState.data.items.map((item) => (
            <Item
              key={(item.id as string).toString()}
              className={item.layout.className}
            >
              {item.id as string}
            </Item>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

export const InsertItemWithAnimation = () => {
  const gridRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
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

      { id: id++, layout: { x: 1, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 2, y: 2, width: 1, height: 1 } },
      { id: id++, layout: { x: 3, y: 2, width: 1, height: 1 } },

      { id: id++, layout: { x: 3, y: 3, width: 2, height: 1 } },
    ]
  );

  const [gridState, setGridState] = useState(grid);

  upsertStyle(gridState);

  useEffect(() => {
    if (gridRef.current) {
      wrapGrid(gridRef.current, {
        easing: 'backOut',
        stagger: 10,
        duration: 300,
      });
    }
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          setGridState((old) =>
            old.set(
              { height: 3, width: 2, x: 2, y: 1 },
              {
                id: 1000,
                layout: { height: 1, width: 1, x: 1, y: 1 },
              }
            )
          )
        }
      >
        Insert
      </button>
      <Container>
        <GridContainer ref={gridRef}>
          {gridState.data.items.map((item) => (
            <Item
              key={(item.id as string).toString()}
              className={item.layout.className}
            >
              {item.id as string}
            </Item>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const GridContainer = styled.div`
  display: grid;
  padding: 10px;
  border: 1px solid #00000011;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: min-content;
  grid-gap: 10px;
`;

const Item = styled.div`
  background-color: rgba(0, 0, 255, 0.1);
  min-height: 100px;
  height: 100%;
  min-width: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  font-size: 20px;
`;
