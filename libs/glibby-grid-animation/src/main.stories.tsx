import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { text, number } from '@storybook/addon-knobs';
import { wrapGrid } from './index';

export default { title: 'Default' };

export const Primary = () => {
  const grid = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const item1 = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const [item1Style, setItem1Style] = useState('item-1');
  useEffect(() => {
    if (grid.current && item1.current) {
      wrapGrid(grid.current, { easing: 'backOut', stagger: 10, duration: 300 });
      setTimeout(() => setItem1Style('item-9'), 1000);
    }
  });
  return (
    <Container>
      <GridContainer ref={grid}>
        <Item ref={item1} className={item1Style}>
          1
        </Item>
        <Item style={{ gridColumn: '2 / span 1', gridRow: '1 / span 1' }}>
          2
        </Item>
        <Item style={{ gridColumn: '3 / span 1', gridRow: '1 / span 1' }}>
          3
        </Item>
        <Item style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1' }}>
          4
        </Item>

        <Item style={{ gridColumn: '1 / span 1', gridRow: '3 / span 1' }}>
          7
        </Item>
      </GridContainer>
    </Container>
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
  width: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: min-content;
  grid-gap: 10px;

  & > .item-1 {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  & > .item-9 {
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    height: 210px;
  }
`;

const Item = styled.div`
  background-color: rgba(0, 0, 255, 0.1);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  font-size: 20px;
`;
