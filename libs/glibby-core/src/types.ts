export type GridOptions = {
  width: number;
  height?: number;
};

export type GridLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GridPosition = {
  x: number;
  y: number;
};

export type GridItem = {
  layout: GridLayout;
  id: string | number;
};

export type GridData = {
  width: number;
  height?: number;

  items: Array<GridItem>;
};

export type Grid = {
  data: GridData;

  set: (
    layoutOrPosition: GridLayout | GridPosition,
    item: Omit<GridItem, 'layout'> & Partial<Pick<GridItem, 'layout'>>
  ) => Grid;
  remove: (id: GridItem['id']) => Grid;
};
